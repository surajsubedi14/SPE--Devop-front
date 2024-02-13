import React, { useState } from 'react';
import axios from 'axios';

function Calculator() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'input1') {
      setInput1(value);
    } else if (name === 'input2') {
      setInput2(value);
    }
  };

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (operation === 'sqrt' || operation === 'log'||operation==='factorial') {
        response = await axios.get(`http://localhost:8080/${operation}?x=${input1}`);
      } else {
        response = await axios.get(`http://localhost:8080/${operation}?x=${input1}&b=${input2}`);
      }
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error: ' + error.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Scientific Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input1" style={{ marginBottom: '5px', display: 'block' }}>Input 1:</label>
        <input type="text" id="input1" name="input1" value={input1} onChange={handleInputChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
        {(operation !== 'sqrt' && operation !== 'log'&&operation !== 'factorial') && (
          <div>
            <label htmlFor="input2" style={{ marginBottom: '5px', display: 'block' }}>Input 2:</label>
            <input type="text" id="input2" name="input2" value={input2} onChange={handleInputChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
        )}
        <div>
          <label htmlFor="operation" style={{ marginBottom: '5px', display: 'block' }}>Choose an operation:</label>
          <select id="operation" value={operation} onChange={handleOperationChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <option value="">Select Operation</option>
            <option value="sqrt">Square Root (√x)</option>
            <option value="factorial">Factorial (x!)</option>
            <option value="log">Natural Logarithm (ln(x))</option>
            <option value="power">Power (xb)</option>
          </select>
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', marginTop: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Calculate</button>
      </form>
      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
        Result: {result}
      </div>
    </div>
  );
}

export default Calculator;
