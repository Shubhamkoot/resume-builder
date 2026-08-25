import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Sparkles, Mail, Lock, ArrowRight, Loader2, UserCheck } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      error('Please enter your email and password');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      success('Welcome back to AI ResumeForge!');
      navigate(from, { replace: true });
    } catch (err) {
      error(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('john@example.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white shadow-md shadow-blue-500/20 mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Sign In to ResumeForge</h2>
          <p className="text-sm text-slate-500 mt-1">Manage and optimize your tailored resumes</p>
        </div>

        {/* Demo Account Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex items-center justify-between">
          <div className="text-left">
            <p className="text-xs font-bold text-blue-900">Demo User Credentials</p>
            <p className="text-[11px] text-blue-700 font-mono">john@example.com / password123</p>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
          >
            <UserCheck className="w-3.5 h-3.5" />
            Auto-fill
          </button>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-lg disabled:opacity-50 transition-all"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
