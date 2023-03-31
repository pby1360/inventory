import React from 'react';

const Content = ({children, className }:any) => {
  return (
    <div className={`content ${className ? className : ''}`}>
      {children}
    </div>
  );
};

export default Content;