import React from 'react';
import './layout.scss';
import { Link } from 'react-router-dom';

type TopBarProps = {
  isLoggedIn: boolean;
}

const topBar: React.FC<TopBarProps> = ({isLoggedIn}) => {

  return (
    <div className='topBar'>
      <a href='/'><span className='logo'></span></a>
      <div className='control-right'>
        {isLoggedIn ? <button className='info'>Info</button> : null}
        <button className='login'><Link to={'/sign-in'}>Sign-in</Link></button>
        <button className='logout'><Link to={'/sign-up'}>Sign-up</Link></button>
      </div>
    </div>
  );
};

export default topBar;