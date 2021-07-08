import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <>
    <img src={spinner} style={spinnerStyle} alt="Loading..." />
  </>
);

// Spinner css style
const spinnerStyle = {
  width: '200px',
  margin: 'auto',
  display: 'block',
};

export default Spinner;
