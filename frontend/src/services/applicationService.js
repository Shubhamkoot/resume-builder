import api from './api';

export const applicationService = {
  async getAllApplications() {
    const res = await api.get('/applications');
    return res.data.data;
  },

  async getApplicationById(id) {
    const res = await api.get(`/applications/${id}`);
    return res.data.data;
  },

  async createApplication(data) {
    const res = await api.post('/applications', data);
    return res.data.data;
  },

  async updateApplication(id, data) {
    const res = await api.put(`/applications/${id}`, data);
    return res.data.data;
  },

  async deleteApplication(id) {
    const res = await api.delete(`/applications/${id}`);
    return res.data;
  }
};
