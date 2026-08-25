import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        try {
          const res = await authService.getCurrentUser();
          if (res.data) {
            setUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
          }
        } catch (err) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    if (res.data && res.data.token) {
      setToken(res.data.token);
      setUser(res.data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    }
  };

  const register = async (fullName, email, password, confirmPassword) => {
    const res = await authService.register({ fullName, email, password, confirmPassword });
    if (res.data && res.data.token) {
      setToken(res.data.token);
      setUser(res.data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    }
  };

  const logout = async () => {
    await authService.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
