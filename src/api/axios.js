/* eslint-disable no-undef */
import axios from 'axios';

const baseURL = process.env.VITE_BACKEND_URL || 'http://localhost:3000';

const api = axios.create({ baseURL });

export default api;
