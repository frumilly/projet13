// src/services/requestApi.js
import axios from 'axios';

const API_URL = 'https://exemple-api.com'; 

const requestApi = axios.create({
  baseURL: API_URL,
});

export default requestApi;
