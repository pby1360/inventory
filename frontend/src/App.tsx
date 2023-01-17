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

  // const [text, setText] = useState<string>('hello!!');

  // useEffect(() => {
  //   axios.get('http://localhost:8080/api/home')
  //     .then((response) => setText(response.data))
  //     .catch(error => console.error(error));
  // }, []);

  return (
      <div className='App'>
        <div className='bottom'>
          <TopBar />
        </div>
        <div className='bottom'>
          <SideBar />
          <Routes>
            {routeList}
            {/* <Route path='/' element={<Home />} />
            <Route path='/site' element={<Site />} />
            <Route path='/area' element={<Area />} />
            <Route path='/inventory' element={<Inventory />} />
            <Route path='/item' element={<Item />} />
            <Route path='*' element={<NotFound />} /> */}
          </Routes>
          {/* <Content /> */}
        </div>
      </div>
  );
}

export default App;
