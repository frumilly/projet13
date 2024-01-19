// User.jsx

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Account from '../components/Account.jsx';
import { setUser } from '../actions/userSlice';
import accountData from '../components/accounts_file.json';
import store from '../actions/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



// Endpoint pour la mise à jour du profil
const updateProfileEndpoint = 'http://localhost:3001/api/v1/user/profile';

// Thunk pour la mise à jour du profil
const updateProfile = createAsyncThunk('user/updateProfile', async (userData, { getState, dispatch }) => {
  try {
    const token = getState().user.token;
    console.log("token",getState().user.token);

    // Effectuer la requête PUT avec le token dans l'en-tête
    await axios.put(
      updateProfileEndpoint,
      { firstName: userData.firstName, lastName: userData.lastName },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Mettre à jour le state Redux avec les nouvelles valeurs
    dispatch(setUser(userData));
  } catch (error) {
    console.error('Update Profile Error:', error);
    throw error;
  }
});

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

  const handleSaveClick = async () => {
    try {
      // Créez un objet userData avec les nouvelles valeurs du profil
      const userData = {
        ...user,
        firstName: editedFirstName,
        lastName: editedLastName,
      };
      console.log(userData);

      // Dispatchez le thunk pour la mise à jour du profil
     await dispatch(updateProfile(userData));

      // Obtenez l'état global actuel
      const currentState = store.getState();
      
      // Enregistrez l'état actuel dans le localStorage
      localStorage.setItem('reduxState', JSON.stringify(currentState));

      // Réinitialiser les états locaux
      setEditing(false);
      setEditedFirstName('');
      setEditedLastName('');
    } catch (error) {
      console.error('Save Profile Error:', error);
    }
  };

  return (
    <div>
      <main className="main bg-dark">
        <div className="header">
          {user && (
            <div>
              {editing ? (
                // Formulaire d'édition
                <div className="edit-form">
                  <h1>Welcome back</h1>
                  <div className="input-container">
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
                  </div>
                  <br />
                  <button className="edit-button" onClick={handleSaveClick}>Save</button>
                  <button onClick={() => setEditing(false)}>Cancel</button>
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

        {/* Contenu restant */}
        {user && (
          <div>
            {accountData.map((account, index) => (
              <Account key={index} title={account.title} amount={account.amount} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default User;
