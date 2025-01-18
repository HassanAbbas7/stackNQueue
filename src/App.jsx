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
      <header>
        <h1>Stack and Queue Visualizer</h1>
        <p>Frontend by: Hassan Abbas Naqvi</p>
        <p>Stack Module by: Noor and Nayl</p>
        <p>Queue Module by: Nameer and Nimra</p>
        
      </header>

      <main>
        {/* Controls */}
        <div className="controls">
          <button
            onClick={addElement}
            disabled={elements.length >= 10 || loading}
            className={elements.length >= 10 ? 'disabled-button' : 'active-button'}
          >
            {elements.length >= 10
              ? 'Element Limit Exceeded'
              : loading
              ? 'Processing...'
              : 'Add Random Element'}
          </button>

          <button onClick={removeElement} disabled={loading} className="active-button">
            {loading ? 'Processing...' : 'Remove'}
          </button>

          <button onClick={toggleMode} disabled={loading} className="active-button">
            Toggle Mode ({mode})
          </button>
        </div>

        {/* Visualizer */}
        <div className={`visualizer ${mode}`}>
        {
  mode === "stack" ? (
    <div className="wrap">
      {elements.map((el, index) => (
        <div key={index} className="element">
          {el}
        </div>
      ))}
    </div>
  ) : (
    elements.map((el, index) => (
      <div key={index} className="element">
        {el}
      </div>
    ))
  )
}

          
        </div>
      </main>
    </div>
  );
};

export default App;
