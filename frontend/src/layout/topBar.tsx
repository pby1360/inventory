import React from 'react';
import './layout.scss';

const topBar = () => {
  return (
    <div className='topBar'>
      <a href='/'><span className='logo'></span></a>
      <div className='control-right'>
        <button className='login'>login</button>
      </div>
    </div>
  );
};

export default topBar;