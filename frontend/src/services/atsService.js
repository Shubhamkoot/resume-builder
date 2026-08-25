import api from './api';

export const atsService = {
  async analyze(data) {
    const res = await api.post('/ats/analyze', data);
    return res.data.data;
  }
};
