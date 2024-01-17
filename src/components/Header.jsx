import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../actions/userSlice';

const Header = () => {
  // J'utilise useDispatch pour déclencher des actions Redux et useSelector pour obtenir des données du store.
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);


  // useEffect me permet d'effectuer des actions après le chargement initial du composant.
  useEffect(() => {

    const userFromLocalStorage = JSON.parse(localStorage.getItem('reduxState'));
    // Je vérifie s'il y a des données utilisateur dans le localStorage.
    // Si des données utilisateur sont présentes, je les définis dans le state Redux.
    if (userFromLocalStorage && userFromLocalStorage.user) {
      dispatch(setUser(userFromLocalStorage.user.user));

    }
    // Note : [] signifie que cette action ne doit être exécutée qu'une seule fois après le montage initial.
  }, [dispatch]);

  // La fonction handleSignOut est appelée lorsque l'utilisateur clique sur "Sign Out".
  const handleSignOut = () => {
    // J'utilise dispatch pour envoyer une action Redux pour supprimer l'utilisateur du store.
    dispatch(setUser(null));

    // Je supprime également les données utilisateur du localStorage.
    localStorage.removeItem('reduxState');
  };

  // Le rendu du composant avec un lien vers la page d'accueil et des informations utilisateur si connecté.
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <div className="main-nav-logo-image" alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="user-info-container">
        {user ? (
          // Si un utilisateur est connecté, j'affiche les informations de l'utilisateur et le bouton "Sign Out".
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
          // Sinon, j'affiche un lien vers la page de connexion.
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
