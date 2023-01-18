import React from 'react';
import './layout.scss';

const topBar = () => {
  return (
    <div className='topBar'>
      <a href='/'><span className='logo'></span></a>
      <div className='control-right'>
      <button className='info'>Info</button>
        <button className='login'>Sign-in</button>
        <button className='logout'>Sign-up</button>
      </div>
    </div>
  );
};

export default topBar;