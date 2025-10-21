// src/contexts/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost:8000/api';
  
  // Konfigurasi default axios
  // Perlu dilakukan di sini agar axios di file lain (seperti useItems.js) otomatis membawa token

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set header default untuk semua request axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.defaults.withCredentials = true; // Tambahkan ini jika menggunakan Sanctum
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_BASE}/me`);
      setUser(response.data);
    } catch (error) {
      // Token tidak valid, hapus
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const response = await axios.post(`${API_BASE}/login`, credentials);
    const { access_token, user } = response.data;
    
    localStorage.setItem('token', access_token);
    // Set header setelah login
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    axios.defaults.withCredentials = true;
    setUser(user);
    
    return response.data;
  };

  const register = async (userData) => {
    const response = await axios.post(`${API_BASE}/register`, userData);
    const { access_token, user } = response.data;
    
    localStorage.setItem('token', access_token);
    // Set header setelah register
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    axios.defaults.withCredentials = true;
    setUser(user);
    
    return response.data;
  };

  const logout = async () => {
    try {
      // Axios akan menggunakan token yang sudah tersimpan untuk request logout ini
      await axios.post(`${API_BASE}/logout`); 
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      delete axios.defaults.withCredentials;
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    API_BASE,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};