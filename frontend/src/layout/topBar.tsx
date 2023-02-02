import React from 'react';
import './layout.scss';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

type TopBarProps = {
  isLoggedIn: boolean;
}

const topBar: React.FC<TopBarProps> = ({isLoggedIn}) => {

  return (
    <div className='topBar'>
      <a href='/'><span className='logo'></span></a>
      <div className='control-right'>
        {isLoggedIn ? <button className='info'>Info</button> : null}
        {/* <Button variant='primary' className='login'><Link to={'/sign-in'}>Sign-in</Link></Button> */}
        {/* <Button variant='outline-primary' className='logout'><Link to={'/sign-up'}>Sign-up</Link></Button> */}
        <Button variant='primary' className='login' href='/sign-in'>Sign-in</Button>
        <Button variant='outline-primary' className='logout'><Link to={'/sign-up'}>Sign-up</Link></Button>
        
      </div>
    </div>
  );
};

export default topBar;