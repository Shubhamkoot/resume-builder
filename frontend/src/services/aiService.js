import api from './api';

export const aiService = {
  async analyzeJob(data) {
    const res = await api.post('/ai/analyze-job', data);
    return res.data.data;
  },

  async generateResume(data) {
    const res = await api.post('/ai/generate-resume', data);
    return res.data.data;
  },

  async improveContent(data) {
    const res = await api.post('/ai/improve', data);
    return res.data.data;
  },

  async improveSummary(data) {
    const res = await api.post('/ai/improve-summary', data);
    return res.data.data;
  },

  async improveExperience(data) {
    const res = await api.post('/ai/improve-experience', data);
    return res.data.data;
  },

  async improveProject(data) {
    const res = await api.post('/ai/improve-project', data);
    return res.data.data;
  }
};
