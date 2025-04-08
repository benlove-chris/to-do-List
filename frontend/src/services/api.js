import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://127.0.0.1:8000/api/', // Local
  baseURL: 'https://benanywhere.pythonanywhere.com/api/', //online
});

export default api;
