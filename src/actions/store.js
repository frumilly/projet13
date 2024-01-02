// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; 

const store = configureStore({
  reducer: {
    user: userReducer,
    // Ajout d'autres slices ici si nécessaire
  },
});

export default store;
