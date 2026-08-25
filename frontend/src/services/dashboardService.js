import api from './api';

export const dashboardService = {
  async getStats() {
    const res = await api.get('/dashboard/stats');
    return res.data.data;
  },

  async getActivity(limit = 10) {
    const res = await api.get(`/dashboard/activity?limit=${limit}`);
    return res.data.data;
  }
};
