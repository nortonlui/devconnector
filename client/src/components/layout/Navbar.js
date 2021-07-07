import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const Navbar = (props) => {
  const {
    auth: { isAuthenticated, loading },
    logout,
    setAlert,
  } = props;
  let history = useHistory();

  const onClick = () => {
    logout();
    setAlert('Logout success !!!', 'success', 3000);
    history.push('/login');
  };

  // Links show with authenticated
  const authLinks = (
    <ul>
      <li>
        <a onClick={onClick} href="#!">
          <i className="fas fa-sign-out-alt"></i>
          {''}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  // Links show without authenticated
  const guestLinks = (
    <ul>
      <li>
        <a href="#!">Developers</a>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, setAlert })(Navbar);
