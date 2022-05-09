import axios from '@/api/axios';

const register = (credentials) => axios.post('/users', {user: credentials});
const login = (credentials) => axios.post('/users/login', {user: credentials});
const getCurrentUser = () => axios.get('/user');

export default {
  register,
  login,
  getCurrentUser,
};
