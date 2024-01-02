// SignIn.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import style from './SignIn.module.css';
import { setToken, setUser } from '../actions/userSlice';
import store from '../actions/store'; 
import { useEffect } from 'react';
const loginEndpoint = 'http://localhost:3001/api/v1/user/login';
const profileEndpoint = 'http://localhost:3001/api/v1/user/profile';


const login = createAsyncThunk('auth/login', async (credentials) => {
  try {
    const response = await axios.post(loginEndpoint, credentials);
    if (response.data.body) {
      const userDataResponse = await axios.post(
        profileEndpoint,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${response.data.body.token}`,
          },
        }
      );

      const userData = userDataResponse.data.body;

      console.log('Données utilisateur:', userData);

      return { ...response.data, userData };
    }
  } catch (error) {
    console.error('Erreur de connexion:', error);
    throw error;
  }
});

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Utiliser useSelector pour accéder aux données utilisateur dans le slice Redux
  const user = useSelector((state) => state.user.user);

  // Vérifier si l'utilisateur existe dans le Redux store ou le localStorage
  useEffect(() => {
    if (user) {
      console.log("ouii user",user);
      // Rediriger vers la page '/user' si l'utilisateur existe
      navigate('/user');
    } else (console.log("pas d'user"))
  }, [user, navigate]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const credentials = {
        email: username,
        password: password,
      };

      const action = await dispatch(login(credentials));

      if (login.fulfilled.match(action)) {
        const { token, userData } = action.payload;

        dispatch(setToken(token));
        dispatch(setUser(userData));

        // Enregistrer l'état Redux dans le localStorage
        const currentState = store.getState();
        localStorage.setItem('reduxState', JSON.stringify(currentState));

        // Rediriger vers la page '/user'
        navigate('/user');
      } else if (login.rejected.match(action)) {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  return (
    <div>
      <main className={style.main} bg-dark>
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="button" className="sign-in-button" onClick={handleLogin}>
              Sign In
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
