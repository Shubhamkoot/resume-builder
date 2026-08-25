import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Key, Database, Server, Sparkles, CheckCircle2 } from 'lucide-react';

export const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Account & System Configuration</h1>
        <p className="text-sm text-slate-500">Review your authenticated profile and backend deployment properties.</p>
      </div>

      {/* User Information Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
            {user?.fullName?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{user?.fullName || 'User'}</h2>
            <p className="text-xs text-slate-500">{user?.email || 'N/A'}</p>
            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
              {user?.role || 'ROLE_USER'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <User className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <span className="text-slate-400 font-bold uppercase block text-[10px]">Account Name</span>
              <span className="text-slate-900 font-semibold">{user?.fullName}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <Mail className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              <span className="text-slate-400 font-bold uppercase block text-[10px]">Email Address</span>
              <span className="text-slate-900 font-semibold">{user?.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Backend Architecture & Deployment Status Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Enterprise Architecture & Deployment Settings
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" /> AI Provider Configuration
              </span>
              <p className="text-slate-500 text-[11px]">
                Configured via environment variables (<code className="font-mono text-blue-700">AI_API_KEY</code>, <code className="font-mono text-blue-700">AI_API_URL</code>, <code className="font-mono text-blue-700">AI_MODEL</code>). Automatic intelligent fallback active.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0">
              Active / Ready
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-teal-600" /> Database Driver & Dialect
              </span>
              <p className="text-slate-500 text-[11px]">
                Supports MySQL 8.0+ production instances with automatic connection pooling and dev mode H2 zero-setup support.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold shrink-0">
              MySQL / H2
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Server className="w-4 h-4 text-purple-600" /> Tomcat WAR Packaging
              </span>
              <p className="text-slate-500 text-[11px]">
                Configured with SpringBootServletInitializer to produce <code className="font-mono text-purple-700">target/resume-forge.war</code> for Apache Tomcat & AWS EC2.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold shrink-0">
              WAR Supported
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
