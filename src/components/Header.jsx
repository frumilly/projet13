import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../actions/userSlice';


const Header = () => {
  const dispatch = useDispatch();
  // Utiliser useSelector pour accéder aux données utilisateur dans le slice Redux
  const user = useSelector((state) => state.user.user);

  const handleSignOut = () => {
    // Dispatch une action pour supprimer l'utilisateur du Redux store
    dispatch(setUser(null));

    // Supprimer les données de l'utilisateur du localStorage
    localStorage.removeItem('reduxState');
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <div className="main-nav-logo-image" alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="user-info-container">
        {/* Afficher le nom de l'utilisateur s'il est connecté */}
        {user ? (
          <div className="user-info">
            <i className="fa fa-user-circle"></i>
            <p className="user-name">{user.firstName}</p>
            <button onClick={handleSignOut} className="sign-out-button">Sign Out</button>
          </div>
        ) : (
          // Afficher le lien "Sign In" s'il n'est pas connecté
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
