import api from './api';

export const resumeService = {
  async getAllResumes() {
    const res = await api.get('/resumes');
    return res.data.data;
  },

  async getResumeById(id) {
    const res = await api.get(`/resumes/${id}`);
    return res.data.data;
  },

  async createResume(data) {
    const res = await api.post('/resumes', data);
    return res.data.data;
  },

  async updateResume(id, data) {
    const res = await api.put(`/resumes/${id}`, data);
    return res.data.data;
  },

  async duplicateResume(id) {
    const res = await api.post(`/resumes/${id}/duplicate`);
    return res.data.data;
  },

  async deleteResume(id) {
    const res = await api.delete(`/resumes/${id}`);
    return res.data;
  },

  async restoreVersion(resumeId, versionId) {
    const res = await api.post(`/resumes/${resumeId}/versions/${versionId}/restore`);
    return res.data.data;
  },

  async downloadPdf(id, filename) {
    const res = await api.get(`/resumes/${id}/pdf`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename ? `${filename}.pdf` : `resume-${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  },

  async downloadDocx(id, filename) {
    const res = await api.get(`/resumes/${id}/docx`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename ? `${filename}.docx` : `resume-${id}.docx`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  },

  async uploadAndParseResume(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post('/resumes/upload-parse', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data.data;
  }
};
