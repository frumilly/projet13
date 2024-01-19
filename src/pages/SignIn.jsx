// SignIn.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import style from './SignIn.module.css';
import { setUser,setToken } from '../actions/userSlice';
import store from '../actions/store';

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

      console.log('User Data:', userData);

      return { token: response.data.body.token, userData };
    }
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
});

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUserFromLocalStorage = async () => {
      const userFromLocalStorage = JSON.parse(localStorage.getItem('reduxState'));

      if (userFromLocalStorage && userFromLocalStorage.user) {
        dispatch(setUser(userFromLocalStorage.user.user));

        navigate('/user');
      }
    };

    checkUserFromLocalStorage();
  }, [dispatch, navigate]);

  const handleLogin = async () => {
    try {
      const credentials = {
        email: username,
        password: password,
      };

      const action = await dispatch(login(credentials));

      if (login.fulfilled.match(action)) {
        const { token, userData } = action.payload;


        dispatch(setUser(userData));
        dispatch(setToken(token)); 
        const currentState = store.getState();
        console.log(currentState);
        localStorage.setItem('reduxState', JSON.stringify(currentState));

        navigate('/user');
      } else if (login.rejected.match(action)) {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <div>
      <main className={style.main}>
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
