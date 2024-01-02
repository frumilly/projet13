import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Account from '../components/Account.jsx';
import { setUser } from '../actions/userSlice';
import accountData from '../components/accounts_file.json';

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Utiliser useSelector pour accéder aux données utilisateur dans le slice Redux
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const checkUser = async () => {
      // Si l'utilisateur n'est pas présent dans le slice Redux, on essaie de le récupérer depuis le localStorage
      if (!user) {
        const userFromLocalStorage = JSON.parse(localStorage.getItem('reduxState'));
        // Si l'utilisateur est présent dans le localStorage, je mets à jour le state Redux
        if (userFromLocalStorage && userFromLocalStorage.user) {
          dispatch(setUser(userFromLocalStorage.user.user));
        } else {
          // Si l'utilisateur n'est ni dans le state Redux ni dans le localStorage, je redirige vers '/'
          navigate('/');
        }
      }
    };

    checkUser();
  }, [user, dispatch, navigate]);

  // Console.log pour afficher le prénom dans la section JSX
  console.log("Affichage du prénom dans le JSX:", user && user.firstName);

  return (
    <div>
      <main className="main bg-dark">
        <div className="header">
          {/* Utilisez les données utilisateur pour afficher le nom */}
          {user && (
            <div>
              <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
              <button className="edit-button">Edit Name</button>
            </div>
          )}
        </div>

        {/* Reste du contenu ici */}
        {accountData.map((account, index) => (
          <Account key={index} title={account.title} amount={account.amount} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default User;
