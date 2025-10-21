// src/components/ItemForm.jsx

import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

const ItemForm = ({ item, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        description: item.description || ''
      });
    } else {
      setFormData({ title: '', description: '' }); // Reset form saat beralih dari edit ke create
    }
  }, [item]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
      // Form akan di-reset/tutup di parent (Dashboard) via onCancel/handleUpdate/handleCreate
    } catch (error) {
      console.error('Error submitting form:', error);
      // Tambahkan penanganan error UI jika diperlukan
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {item ? 'Edit Item' : 'Create New Item'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="input"
            placeholder="Enter item title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="input resize-none"
            placeholder="Enter item description (optional)"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading} // Tambahkan disabled agar tidak bisa cancel saat loading
            className="btn btn-secondary flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </button>
          
          <button
            type="submit"
            disabled={loading || !formData.title.trim()} // Tambahkan validasi minimal title
            className="btn btn-primary flex items-center space-x-2"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{loading ? 'Saving...' : (item ? 'Update' : 'Create')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;