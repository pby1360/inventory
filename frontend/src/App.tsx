// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import TopBar from './layout/topBar'
import SideBar from './layout/sideBar';
import Content from './layout/content';

function App() {

  // const [text, setText] = useState<string>('hello!!');

  // useEffect(() => {
  //   axios.get('http://localhost:8080/api/home')
  //     .then((response) => setText(response.data))
  //     .catch(error => console.error(error));
  // }, []);

  return (
      <div>
        <TopBar />
        <SideBar />
        <Content />
      </div>
  );
}

export default App;
