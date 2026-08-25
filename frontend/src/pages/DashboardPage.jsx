import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dashboardService } from '../services/dashboardService';
import { resumeService } from '../services/resumeService';
import { ScoreGauge } from '../components/ScoreGauge';
import { 
  FileText, 
  Sparkles, 
  SearchCheck, 
  Briefcase, 
  Plus, 
  Download, 
  Clock, 
  TrendingUp, 
  ArrowRight, 
  Copy, 
  Edit3,
  Bot,
  Layers,
  CheckCircle2,
  FileDown
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  const loadData = async () => {
    try {
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDownloadPdf = async (id, title) => {
    try {
      await resumeService.downloadPdf(id, title);
      success("PDF downloaded successfully!");
    } catch (err) {
      error("Failed to download PDF");
    }
  };

  const handleDownloadDocx = async (id, title) => {
    try {
      await resumeService.downloadDocx(id, title);
      success("Word DOCX downloaded successfully!");
    } catch (err) {
      error("Failed to download DOCX");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            AI ResumeForge Career Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.fullName || 'Engineer'}!
          </h1>
          <p className="text-slate-300 text-sm max-w-xl">
            "Build manually. Optimize with AI. Get hired." Tailor your next application to beat ATS filters.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 relative z-10">
          <Link
            to="/ai-matcher"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 shadow-md shadow-emerald-950/20 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-emerald-950" />
            Build With AI Matcher
          </Link>
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-950/20 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            New Resume
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Resumes</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{stats?.totalResumes || 0}</p>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400">
              <span>{stats?.manualResumes || 0} Manual</span>
              <span>•</span>
              <span>{stats?.aiResumes || 0} AI</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">AI Tailored</p>
            <p className="text-2xl font-extrabold text-indigo-600 mt-1">{stats?.aiResumes || 0}</p>
            <p className="text-[11px] text-indigo-500 mt-1 font-medium">Job Matched</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">JDs Analyzed</p>
            <p className="text-2xl font-extrabold text-teal-600 mt-1">{stats?.jobDescriptionsAnalyzed || 0}</p>
            <p className="text-[11px] text-teal-600 mt-1 font-medium">Roles scanned</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Applications</p>
            <p className="text-2xl font-extrabold text-amber-600 mt-1">{stats?.totalApplications || 0}</p>
            <p className="text-[11px] text-amber-600 mt-1 font-medium">Active Pipeline</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-center justify-between col-span-2 lg:col-span-1">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Average ATS</p>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">{stats?.averageAtsScore || 0}%</p>
            <p className="text-[11px] text-emerald-600 mt-1 font-medium">Readability Score</p>
          </div>
          <ScoreGauge score={Math.round(stats?.averageAtsScore || 0)} size="sm" showLabel={false} />
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div>
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <Link
            to="/builder"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-start group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors mb-2">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Create Resume</span>
            <span className="text-[11px] text-slate-500 mt-0.5">Manual 13-step editor</span>
          </Link>

          <Link
            to="/ai-matcher"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-start group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors mb-2">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-600">Build from JD</span>
            <span className="text-[11px] text-slate-500 mt-0.5">Paste JD & Match</span>
          </Link>

          <Link
            to="/ats-analyzer"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all flex flex-col items-start group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors mb-2">
              <SearchCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">Analyze Resume</span>
            <span className="text-[11px] text-slate-500 mt-0.5">Upload PDF/DOCX</span>
          </Link>

          <Link
            to="/resumes"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all flex flex-col items-start group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-slate-800 group-hover:text-white transition-colors mb-2">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-900 group-hover:text-slate-800">My Resumes</span>
            <span className="text-[11px] text-slate-500 mt-0.5">Manage versions</span>
          </Link>

          <Link
            to="/applications"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all flex flex-col items-start group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors mb-2">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-900 group-hover:text-amber-600">Job Tracker</span>
            <span className="text-[11px] text-slate-500 mt-0.5">Kanban pipeline</span>
          </Link>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Resumes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Recent Resumes</h2>
            <Link to="/resumes" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All ({stats?.totalResumes || 0}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {stats?.recentResumes && stats.recentResumes.length > 0 ? (
              stats.recentResumes.map((resume) => (
                <div
                  key={resume.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm hover:text-blue-600">
                        {resume.title}
                      </span>
                      {resume.isAiGenerated && (
                        <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold">
                          AI Tailored
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">
                        {resume.template}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500">
                      Target: <span className="font-medium text-slate-700">{resume.targetRole || 'Not specified'}</span>
                      {resume.targetCompany && <span> @ {resume.targetCompany}</span>}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-emerald-600 block">{resume.atsScore || 85}% ATS</span>
                      <span className="text-[10px] text-slate-400">Score</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Link
                        to={`/builder?id=${resume.id}`}
                        className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Resume"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>

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
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
                <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">No resumes created yet.</p>
                <Link
                  to="/builder"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                >
                  <Plus className="w-3.5 h-3.5" /> Create First Resume
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Recent Activity & Applications snapshot */}
        <div className="space-y-6">
          {/* Job Applications Snapshot */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Application Pipeline</h3>
              <Link to="/applications" className="text-xs text-blue-600 font-bold hover:underline">
                View Tracker
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
                <span className="font-extrabold text-blue-700 text-base block">{stats?.applicationsByStatus?.APPLIED || 0}</span>
                <span className="text-[10px] text-blue-600 font-semibold uppercase">Applied</span>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-100">
                <span className="font-extrabold text-purple-700 text-base block">{stats?.applicationsByStatus?.INTERVIEW || 0}</span>
                <span className="text-[10px] text-purple-600 font-semibold uppercase">Interview</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="font-extrabold text-emerald-700 text-base block">{stats?.applicationsByStatus?.SELECTED || 0}</span>
                <span className="text-[10px] text-emerald-600 font-semibold uppercase">Selected</span>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
            <div className="space-y-3">
              {stats?.recentActivity && stats.recentActivity.length > 0 ? (
                stats.recentActivity.map((log) => (
                  <div key={log.id} className="flex items-start gap-2.5 text-xs">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <div>
                      <p className="text-slate-800 font-medium">{log.description}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">No recent activity recorded.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
