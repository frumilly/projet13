import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Account from '../components/Account.jsx';
import { setUser } from '../actions/userSlice';
import accountData from '../components/accounts_file.json';
import store from '../actions/store';

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const [editing, setEditing] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState(user ? user.firstName : '');
  const [editedLastName, setEditedLastName] = useState(user ? user.lastName : '');

  useEffect(() => {
    const checkUser = async () => {
      if (!user) {
        const userFromLocalStorage = JSON.parse(localStorage.getItem('reduxState'));
        if (userFromLocalStorage && userFromLocalStorage.user) {
          dispatch(setUser(userFromLocalStorage.user.user));
        } else {
          navigate('/sign-in');
        }
      }
    };

    checkUser();
  }, [user, dispatch, navigate]);

  const handleEditClick = () => {
    // Pré-remplir les champs avec les valeurs actuelles
    setEditedFirstName(user ? user.firstName : '');
    setEditedLastName(user ? user.lastName : '');
    setEditing(true);
  };

  const handleSaveClick = () => {
    // Mettez à jour le state Redux avec les nouvelles valeurs
    const updatedUser = { ...user, firstName: editedFirstName, lastName: editedLastName };
    dispatch(setUser(updatedUser));
  // Obtenez l'état global actuel
  const currentState = store.getState();

  // Enregistrez l'état actuel dans le localStorage
  localStorage.setItem('reduxState', JSON.stringify(currentState));
    // Réinitialiser les états locaux
    //setEditing(false);
   // setEditedFirstName('');
   // setEditedLastName('');
  };

  return (
    <div>
      <main className="main bg-dark">
        <div className="header">
          {user && (
            <div>
              {editing ? (
                // Formulaire d'édition
               
                <div>
                   <h1>Welcome back </h1>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={editedFirstName}
                    onChange={(e) => setEditedFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={editedLastName}
                    onChange={(e) => setEditedLastName(e.target.value)}
                  />
                  <button onClick={handleSaveClick}>Save</button>
                </div>
              ) : (
                // Affichage du nom
                <div>
                  <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
                  <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
                </div>
              )}
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
