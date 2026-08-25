import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Sparkles, User, Mail, Lock, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

export const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register(fullName, email, password, confirmPassword);
      success('Account created successfully! Welcome to AI ResumeForge.');
      navigate('/dashboard');
    } catch (err) {
      error(err.response?.data?.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white shadow-md shadow-blue-500/20 mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create Free Account</h2>
          <p className="text-sm text-slate-500 mt-1">Start building ATS-optimized tailored resumes</p>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
          </div>

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
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
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
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
