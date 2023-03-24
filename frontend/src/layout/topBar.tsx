import React from 'react';
import './layout.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import authService from '../components/authService';

type TopBarProps = {
  isLoggedIn: boolean;
}

const TopBar: React.FC<TopBarProps> = ({isLoggedIn}) => {

  const naviate = useNavigate();

  const logout = () => {
    authService.logout();
    naviate('/');
    naviate(0);
  }

  return (
    <div className='topBar'>
      <a href='/'><span className='logo'></span></a>
      <div className='control-right'>
        {isLoggedIn ?
          <>
            <Button variant='outline-dark' className='info'>Info</Button>
            <Button variant='dark' onClick={logout} className='logout'>Logout</Button>
          </>
           : 
           <>
            <Button variant='primary' className='login' href='/sign-in'>Sign-in</Button>
            <Button variant='outline-primary' className='logout'><Link to={'/sign-up'}>Sign-up</Link></Button>
          </>
        }
      </div>
    </div>
  );
};

export default TopBar;