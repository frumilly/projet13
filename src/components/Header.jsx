// Header.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setToken } from '../actions/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('reduxState'));

    if (userFromLocalStorage && userFromLocalStorage.user) {
      dispatch(setUser(userFromLocalStorage.user.user));
      dispatch(setToken(userFromLocalStorage.user.token));
    }
  }, [dispatch]);

  const handleSignOut = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    localStorage.removeItem('reduxState');
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <div className="main-nav-logo-image" alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="user-info-container">
        {user ? (
          <div className="user-info">
            <div className="user-info-item">
              <i className="fa fa-user-circle with-margin"></i>
              <p className="user-name">{user.firstName}</p>
            </div>
            <div className="user-info-item">
              <i className="fa fa-sign-out with-margin"></i>
              <button onClick={handleSignOut} className="main-nav-item sign-out-button">
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
