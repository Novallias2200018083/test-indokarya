// src/hooks/useItems.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export const useItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // HANYA ambil API_BASE, getAuthHeaders dihapus
  const { API_BASE } = useAuth(); 

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching items from:', `${API_BASE}/items`);
      
      // PERBAIKAN UTAMA: Panggil axios tanpa header eksplisit 
      // karena header sudah diatur di AuthContext.jsx
      const response = await axios.get(`${API_BASE}/items`);
      
      console.log('Items response:', response.data);
      
      if (response.data.success) {
        setItems(response.data.data || []);
      } else {
        throw new Error(response.data.message || 'Failed to fetch items');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      setError(error.response?.data?.message || error.message);
      // Jangan throw error di sini jika hanya untuk logging, 
      // tapi biarkan jika hook pemanggil perlu menangkapnya.
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (itemData) => {
    setError(null);
    try {
      // PERBAIKAN: Panggil axios.post tanpa header
      const response = await axios.post(`${API_BASE}/items`, itemData);
      
      if (response.data.success) {
        setItems(prev => [response.data.data, ...prev]);
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to create item');
      }
    } catch (error) {
      console.error('Error creating item:', error);
      setError(error.response?.data?.message || error.message);
      throw error;
    }
  };

  const updateItem = async (id, itemData) => {
    setError(null);
    try {
      // PERBAIKAN: Panggil axios.put tanpa header
      const response = await axios.put(`${API_BASE}/items/${id}`, itemData);
      
      if (response.data.success) {
        setItems(prev => prev.map(item => 
          item.id === id ? response.data.data : item
        ));
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      setError(error.response?.data?.message || error.message);
      throw error;
    }
  };

  const deleteItem = async (id) => {
    setError(null);
    try {
      // PERBAIKAN: Panggil axios.delete tanpa header
      const response = await axios.delete(`${API_BASE}/items/${id}`);
      
      if (response.data.success) {
        setItems(prev => prev.filter(item => item.id !== id));
      } else {
        throw new Error(response.data.message || 'Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      setError(error.response?.data?.message || error.message);
      throw error;
    }
  };

  useEffect(() => {
   
    fetchItems();
  }, []); 

  return {
    items,
    loading,
    error,
    fetchItems,
    createItem,
    updateItem,
    deleteItem
  };
};