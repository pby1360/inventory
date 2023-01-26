// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import TopBar from './layout/topBar'
import SideBar from './layout/sideBar';

import routes from './routes';

// import Home from './pages/home';
// import Site from './pages/site/site';
// import Area from './pages/area/area';
// import Inventory from './pages/inventory/inventory';
// import Item from './pages/item/item';
// import NotFound from './pages/NotFound';

interface route {
  name: string;
  label: string;
  path: string;
  component: React.FC;
  isNavData: boolean;
}
function App() {

  const routeList = routes.map((route:route) => <Route key={route.name} path={route.path} element={<route.component />} />);
  const isLoggedIn = false;
  
  // const [text, setText] = useState<string>('hello!!');

  // useEffect(() => {
  //   axios.get('http://localhost:8080/api/home')
  //     .then((response) => setText(response.data))
  //     .catch(error => console.error(error));
  // }, []);

  return (
      <div className='App'>
        <div className='bottom'>
          <TopBar isLoggedIn={isLoggedIn} />
        </div>
        <div className='bottom'>
          {/* 로그인 여부에 따라 sidebar 노출 */}
          { isLoggedIn ? <SideBar /> : null}
          <Routes>
            {routeList}
          </Routes>
        </div>
      </div>
  );
}

export default App;
