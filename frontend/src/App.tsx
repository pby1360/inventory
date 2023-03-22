import { Route, Routes } from 'react-router-dom';
import './App.css';
import TopBar from './layout/topBar'
import SideBar from './layout/sideBar';
import authService from './components/authService';

import routes from './routes';

interface route {
  name: string;
  label: string;
  path: string;
  component: React.FC;
  isNavData: boolean;
}
function App() {

  const routeList = routes.map((route:route) => <Route key={route.name} path={route.path} element={<route.component />} />);
  const isLoggedIn = authService.isUserLoggedIn();
  
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
