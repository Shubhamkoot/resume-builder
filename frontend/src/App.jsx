import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ResumeListPage } from './pages/ResumeListPage';
import { ManualResumeBuilderPage } from './pages/ManualResumeBuilderPage';
import { AIResumeBuilderPage } from './pages/AIResumeBuilderPage';
import { ATSAnalyzerPage } from './pages/ATSAnalyzerPage';
import { JobApplicationsPage } from './pages/JobApplicationsPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Dashboard & App Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/resumes" element={<ProtectedRoute><ResumeListPage /></ProtectedRoute>} />
                <Route path="/builder" element={<ProtectedRoute><ManualResumeBuilderPage /></ProtectedRoute>} />
                <Route path="/ai-matcher" element={<ProtectedRoute><AIResumeBuilderPage /></ProtectedRoute>} />
                <Route path="/ats-analyzer" element={<ProtectedRoute><ATSAnalyzerPage /></ProtectedRoute>} />
                <Route path="/applications" element={<ProtectedRoute><JobApplicationsPage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
