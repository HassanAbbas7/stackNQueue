import React, { useState } from 'react';
import './App.css'; // Optional for styling

const App = () => {
  const [elements, setElements] = useState([]);
  const [mode, setMode] = useState('stack'); // 'stack' or 'queue'
  const [loading, setLoading] = useState(false);

  const callApi = async (action, list, mode, element = null) => {
    setLoading(true);
    try {
      const response = await fetch('https://hassanabbasnaqvi.pythonanywhere.com/api/elements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          elements: list, // Send the current list
          mode,
          element, // Optional, only for "add"
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setElements(data.updatedElements); // Update the list with API response
    } catch (error) {
      console.error('Error during API call:', error);
    } finally {
      setLoading(false);
    }
  };

  const addElement = async () => {
    if (elements.length < 10) {
      const randomElement = Math.floor(Math.random() * 100); // Generate random number
      await callApi('add', elements, mode, randomElement);
    }
  };

  const removeElement = async () => {
    await callApi('remove', elements, mode);
  };

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'stack' ? 'queue' : 'stack'));
  };

  return (
    <div className="container">
      <h1>Stack and Queue Visualizer</h1>
      {/* <div>{"[" + elements.join(', ') + "]"}</div> */}
      <div className="controls">
        {/* Add Random Element Button */}
        <button
          onClick={addElement}
          disabled={elements.length >= 10 || loading}
          style={{
            backgroundColor: elements.length >= 10 ? 'red' : '',
            cursor: elements.length >= 10 ? 'not-allowed' : 'pointer',
            color: elements.length >= 10 ? 'white' : 'black',
          }}
        >
          {elements.length >= 10
            ? 'Element Limit Exceeded'
            : loading
            ? 'Processing...'
            : 'Add Random Element'}
        </button>

        {/* Remove Button */}
        <button onClick={removeElement} disabled={loading}>
          {loading ? 'Processing...' : 'Remove'}
        </button>

        {/* Toggle Mode Button */}
        <button onClick={toggleMode} disabled={loading}>
          Toggle Mode ({mode})
        </button>
      </div>

      <div className={`visualizer ${mode}`}>
        {elements.map((el, index) => (
          <div key={index} className="element">
            {el}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
