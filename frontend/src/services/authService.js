import api from './api';

export const authService = {
  async register(data) {
    const res = await api.post('/auth/register', data);
    return res.data;
  },

  async login(data) {
    const res = await api.post('/auth/login', data);
    return res.data;
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // ignore
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  async getCurrentUser() {
    const res = await api.get('/auth/me');
    return res.data;
  }
};
