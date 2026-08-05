import React from 'react';
import './Background.css';

// We use a small inline CSS for the background animations
export const Background = () => {
  return (
    <div className="bg-wrapper">
      <div className="bg-gradient bg-gradient-1" />
      <div className="bg-gradient bg-gradient-2" />
      <div className="bg-noise" />
    </div>
  );
};
