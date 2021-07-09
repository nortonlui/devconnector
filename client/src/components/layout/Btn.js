import React from 'react';
import { Link } from 'react-router-dom';

const Btn = (props) => {
  const { to, classes, title } = props;
  return (
    <Link to={to} className={classes}>
      {title}
    </Link>
  );
};

export default Btn;
