// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import User from './pages/User';
import './App.css';
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Layout/>} >
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="user" element={<User />} />
        <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
