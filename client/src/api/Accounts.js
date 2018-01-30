import axios from 'axios';

export default {
  loginWithPassword: credentials => axios.post('/auth/login', credentials),
  logout: () => axios.get('/auth/logout'),
};
