import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../routes';

interface NavData {
  name: string;
  label: string;
  path: string;
  isNavData: boolean;
}

const sideBar = () => {

  const navs = routes.map((nav:NavData) => nav.isNavData ? <li><NavLink className={({isActive}) => isActive ? 'active' : undefined } to={nav.path}><span>{nav.label}</span></NavLink></li> : null);

  return (
    <div className='sideBar'>
      <ul>
        {navs}
      </ul>
    </div>
  );
};

export default sideBar;