import React, { useState, useEffect } from 'react';
import Welcome from './Welcome'

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('https://zach33.pythonanywhere.com/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Welcome />
        <p>The current time is {currentTime}.</p>
      </header>
    </div>
  );
}

export default App;