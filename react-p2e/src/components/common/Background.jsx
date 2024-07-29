import React from 'react';
import { BackgroundProps } from '../shared/types.d';

const Background = ({ children, hasBackground }) => {
  return (
    <div className={`absolute inset-0 ${hasBackground ? 'bg-primary-50' : 'bg-transparent'}`}>
      {children}
    </div>
  );
};

export default Background;
