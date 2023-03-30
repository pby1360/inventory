import React from 'react';
import './layout.scss';
const ContentTopBar = ({children}:any) => {
  return (
    <section className='content-top-bar'>{children}</section>
  );
};

export default ContentTopBar;