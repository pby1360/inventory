import React from 'react';

const content = ({children, className }:any) => {
  return (
    <div className={`content ${className ? className : ''}`}>
      {children}
    </div>
  );
};

export default content;