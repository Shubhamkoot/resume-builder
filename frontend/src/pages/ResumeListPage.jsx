import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { resumeService } from '../services/resumeService';
import { useToast } from '../context/ToastContext';
import { 
  FileText, 
  Plus, 
  Search, 
  Copy, 
  Trash2, 
  Edit3, 
  Download, 
  Sparkles, 
  FileDown,
  Loader2,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ResumeListPage = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { success, error } = useToast();

  const loadResumes = async () => {
    try {
      const data = await resumeService.getAllResumes();
      setResumes(data || []);
    } catch (err) {
      error("Failed to load resumes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const handleDuplicate = async (id) => {
    try {
      await resumeService.duplicateResume(id);
      success("Resume duplicated successfully!");
      loadResumes();
    } catch (err) {
      error("Failed to duplicate resume");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume? This action cannot be undone.")) return;
    try {
      await resumeService.deleteResume(id);
      success("Resume deleted");
      loadResumes();
    } catch (err) {
      error("Failed to delete resume");
    }
  };

  const handleDownloadPdf = async (id, title) => {
    try {
      await resumeService.downloadPdf(id, title);
      success("PDF downloaded!");
    } catch (err) {
      error("Failed to download PDF");
    }
  };

  const handleDownloadDocx = async (id, title) => {
    try {
      await resumeService.downloadDocx(id, title);
      success("DOCX downloaded!");
    } catch (err) {
      error("Failed to download DOCX");
    }
  };

  const filtered = resumes.filter(r => 
    r.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.targetRole?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.targetCompany?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Resumes</h1>
          <p className="text-sm text-slate-500">Manage multiple tailored resumes, versions, and ATS scores</p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/ai-matcher"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            Build with AI JD Matcher
          </Link>
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            New Resume
          </Link>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title, target role, or company..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-xs"
        />
      </div>

      {/* Resumes Grid */}
      {loading ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((resume) => (
            <div
              key={resume.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-soft hover:shadow-card transition-all p-5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                      {resume.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {resume.targetRole ? resume.targetRole : 'General Role'}
                      {resume.targetCompany && ` • ${resume.targetCompany}`}
                    </p>
                  </div>

                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold shrink-0">
                    {resume.atsScore || 85}% ATS
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {resume.isAiGenerated && (
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-100">
                      AI Generated
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                    Template: {resume.template}
                  </span>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Link
                    to={`/builder?id=${resume.id}`}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Resume"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleDuplicate(resume.id)}
                    className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Duplicate Resume"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDownloadPdf(resume.id, resume.title)}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Download PDF"
                  >
                    <FileDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDownloadDocx(resume.id, resume.title)}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Download Word DOCX"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => handleDelete(resume.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete Resume"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-4">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-slate-900">No resumes found</h3>
            <p className="text-xs text-slate-500 mt-1">Get started by creating your first manual resume or generating one from a Job Description.</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl"
            >
              <Plus className="w-4 h-4" /> Create Manual Resume
            </Link>
            <Link
              to="/ai-matcher"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl"
            >
              <Sparkles className="w-4 h-4" /> Match from JD
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
