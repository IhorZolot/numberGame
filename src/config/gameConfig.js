import axios from 'axios';

export const API = axios.create({
  baseURL:  import.meta.env.MODE === 'development'
  ? 'http://localhost:3000/api/' 
  : 'https://backendnumbergame.onrender.com/api',
});