import React, { useState, useEffect } from 'react';
import { applicationService } from '../services/applicationService';
import { resumeService } from '../services/resumeService';
import { useToast } from '../context/ToastContext';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  Edit3, 
  Building, 
  Calendar, 
  DollarSign, 
  MapPin, 
  ExternalLink, 
  Loader2,
  X,
  CheckCircle2,
  Filter
} from 'lucide-react';

const STATUS_COLUMNS = [
  { id: 'SAVED', label: 'Saved', color: 'bg-slate-100 text-slate-700 border-slate-300' },
  { id: 'APPLIED', label: 'Applied', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'ASSESSMENT', label: 'Assessment', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'INTERVIEW', label: 'Interview', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'SELECTED', label: 'Selected / Offer', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'REJECTED', label: 'Rejected', color: 'bg-rose-50 text-rose-700 border-rose-200' },
];

export const JobApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const { success, error } = useToast();

  const [formData, setFormData] = useState({
    company: '',
    jobTitle: '',
    status: 'APPLIED',
    salary: '',
    location: '',
    jobUrl: '',
    notes: '',
    resumeId: ''
  });

  const loadData = async () => {
    try {
      const [apps, resList] = await Promise.all([
        applicationService.getAllApplications(),
        resumeService.getAllResumes()
      ]);
      setApplications(apps || []);
      setResumes(resList || []);
    } catch (err) {
      error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openNewModal = () => {
    setEditingApp(null);
    setFormData({
      company: '',
      jobTitle: '',
      status: 'APPLIED',
      salary: '',
      location: '',
      jobUrl: '',
      notes: '',
      resumeId: resumes[0]?.id ? resumes[0].id.toString() : ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (app) => {
    setEditingApp(app);
    setFormData({
      company: app.company,
      jobTitle: app.jobTitle,
      status: app.status,
      salary: app.salary || '',
      location: app.location || '',
      jobUrl: app.jobUrl || '',
      notes: app.notes || '',
      resumeId: app.resumeId ? app.resumeId.toString() : ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.company || !formData.jobTitle) {
      error('Company and Job Title are required');
      return;
    }

    try {
      const payload = {
        ...formData,
        resumeId: formData.resumeId ? parseInt(formData.resumeId, 10) : null
      };

      if (editingApp) {
        await applicationService.updateApplication(editingApp.id, payload);
        success('Application updated');
      } else {
        await applicationService.createApplication(payload);
        success('Application added to pipeline!');
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      error('Failed to save application');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application entry?')) return;
    try {
      await applicationService.deleteApplication(id);
      success('Application deleted');
      loadData();
    } catch (err) {
      error('Failed to delete application');
    }
  };

  const handleStatusChange = async (app, newStatus) => {
    try {
      await applicationService.updateApplication(app.id, {
        company: app.company,
        jobTitle: app.jobTitle,
        status: newStatus,
        notes: app.notes,
        salary: app.salary,
        location: app.location,
        jobUrl: app.jobUrl,
        resumeId: app.resumeId
      });
      loadData();
    } catch (err) {
      error('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            Career Opportunity Pipeline
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Job Application Tracker</h1>
          <p className="text-sm text-slate-500">Track active interviews, submitted resumes, and salary ranges</p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs"
        >
          <Plus className="w-4 h-4" /> Add Application
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-start">
        {STATUS_COLUMNS.map((col) => {
          const colApps = applications.filter(a => a.status === col.id);
          return (
            <div key={col.id} className="bg-slate-100/70 rounded-2xl p-3 border border-slate-200 space-y-3 min-h-[500px]">
              {/* Column Header */}
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">{col.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold border ${col.color}`}>
                  {colApps.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {colApps.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-soft hover:shadow-md transition-all space-y-2.5 text-xs"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-slate-900 leading-tight">{app.jobTitle}</h4>
                      <button
                        onClick={() => openEditModal(app)}
                        className="text-slate-400 hover:text-blue-600 p-0.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>{app.company}</span>
                    </div>

                    {app.location && (
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{app.location}</span>
                      </div>
                    )}

                    {app.salary && (
                      <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                        <DollarSign className="w-3 h-3" />
                        <span>{app.salary}</span>
                      </div>
                    )}

                    {app.notes && (
                      <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100 line-clamp-2">
                        {app.notes}
                      </p>
                    )}

                    {/* Status Dropdown */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app, e.target.value)}
                        className="w-full p-1 bg-slate-50 border border-slate-200 rounded text-[10.5px] font-semibold text-slate-700 focus:outline-none"
                      >
                        {STATUS_COLUMNS.map(c => (
                          <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                      </select>

                      <button
                        onClick={() => handleDelete(app.id)}
                        className="text-slate-300 hover:text-rose-600 p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                {editingApp ? 'Edit Job Application' : 'Add New Application'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Google, Stripe"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none"
                  >
                    {STATUS_COLUMNS.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="e.g. $160,000 - $190,000"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="San Francisco, CA (Remote)"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Associated Resume</label>
                  <select
                    value={formData.resumeId}
                    onChange={(e) => setFormData({ ...formData, resumeId: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none"
                  >
                    <option value="">None</option>
                    {resumes.map(r => (
                      <option key={r.id} value={r.id}>{r.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Job URL</label>
                <input
                  type="url"
                  value={formData.jobUrl}
                  onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                  placeholder="https://jobs.lever.co/..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Notes & Follow-ups</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Recruiter contact, next round dates, notes..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
