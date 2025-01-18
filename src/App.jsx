// import React, { useState } from 'react';
// import './App.css'; // Optional for styling


// const App = () => {
//   const [elements, setElements] = useState([]);
//   const [mode, setMode] = useState('stack'); // 'stack' or 'queue'

//   const generateRandomElement = () => {
//     return Math.floor(Math.random() * 100); // Random number between 0 and 99
//   };

//   const addElement = () => {
//     const randomElement = generateRandomElement();
//     setElements(prev => ([...prev, randomElement]));
//   };

//   const removeElement = () => {
//     setElements(prev => (mode === 'queue' ? prev.slice(1) : prev.slice(0, -1)));
//   };

//   const toggleMode = () => {
//     setMode(prevMode => (prevMode === 'stack' ? 'queue' : 'stack'));
//   };

//   return (
//     <div className="container">
//       <h1>Stack and Queue Visualizer</h1>
//       <div className="controls">
//         <button onClick={addElement}>Add Random Element</button>
//         <button onClick={removeElement}>Remove</button>
//         <button onClick={toggleMode}>Toggle Mode ({mode})</button>
//       </div>

//       <div className={`visualizer ${mode}`}>
//         {elements.map((el, index) => (
//           <div key={index} className="element">
//             {el}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import './App.css'; // Optional for styling

const App = () => {
  const [elements, setElements] = useState([]);
  const [mode, setMode] = useState('stack'); // 'stack' or 'queue'
  const [loading, setLoading] = useState(false);

  const callApi = async (action, element = null) => {
    setLoading(true);
    try {
      const response = await fetch('https://hassanabbasnaqvi.pythonanywhere.com/api/elements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          mode,
          element, // Optional, only required for adding an element
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setElements(data.updatedElements); // Assuming API returns updated list
    } catch (error) {
      console.error('Error during API call:', error);
    } finally {
      setLoading(false);
    }
  };

  const addElement = async () => {
    const randomElement = Math.floor(Math.random() * 100); // Generate random number
    await callApi('add', randomElement);
  };

  const removeElement = async () => {
    await callApi('remove');
  };

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'stack' ? 'queue' : 'stack'));
  };

  return (
    <div className="container">
      <h1>Stack and Queue Visualizer</h1>
      <div className="controls">
        <button onClick={addElement} disabled={loading}>
          {loading ? 'Processing...' : 'Add Random Element'}
        </button>
        <button onClick={removeElement} disabled={loading}>
          {loading ? 'Processing...' : 'Remove'}
        </button>
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
