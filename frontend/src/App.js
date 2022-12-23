import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [text, setText] = useState ('hello!!');

  useEffect(() => {
    axios.get('http://localhost:8080/api/home')
      .then((response) => setText(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{text}</p>
      </header>
    </div>
  );
}

export default App;
