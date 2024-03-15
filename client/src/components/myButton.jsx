// src/components/MyButton.jsx

import React from 'react';

const MyButton = ({ children, onClick, disabled, className }) => {
  return (
    <button
      className={`my-button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default MyButton;
