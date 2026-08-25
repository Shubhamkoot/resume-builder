import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FileText, 
  Sparkles, 
  SearchCheck, 
  Briefcase, 
  LayoutDashboard, 
  LogOut, 
  User as UserIcon,
  Menu,
  X
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/resumes', label: 'My Resumes', icon: FileText },
    { path: '/builder', label: 'Manual Builder', icon: FileText },
    { path: '/ai-matcher', label: 'AI JD Builder', icon: Sparkles, badge: 'AI' },
    { path: '/ats-analyzer', label: 'ATS Analyzer', icon: SearchCheck },
    { path: '/applications', label: 'Job Tracker', icon: Briefcase },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">AI Resume<span className="text-blue-600">Forge</span></span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium -mt-1 hidden sm:block">Build manually. Optimize with AI.</span>
            </div>
          </Link>

          {/* Desktop Nav for Authenticated */}
          {isAuthenticated ? (
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-600 text-white animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          ) : (
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Features</Link>
              <Link to="/#templates" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Templates</Link>
              <Link to="/#how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">How it Works</Link>
            </nav>
          )}

          {/* User Controls */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                    {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-semibold text-slate-700 max-w-[120px] truncate">{user?.fullName || 'User'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all hover:shadow-md"
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2">
          {isAuthenticated ? (
            <>
              <div className="px-3 py-2 border-b border-slate-100 mb-2">
                <p className="text-xs font-medium text-slate-400">Signed in as</p>
                <p className="text-sm font-bold text-slate-800">{user?.fullName} ({user?.email})</p>
              </div>
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                <UserIcon className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              <button
                onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 text-left"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="space-y-3 pt-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-2.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold"
              >
                Get Started Free
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
