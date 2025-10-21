// src/components/Dashboard.jsx

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useItems } from '../hooks/useItems';
import ItemForm from './ItemForm';
import ItemList from './ItemList';
import { Plus, LogOut, User } from 'lucide-react';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { user, logout } = useAuth();
  const { items, loading, createItem, updateItem, deleteItem } = useItems();

  const handleCreate = async (itemData) => {
    await createItem(itemData);
    setShowForm(false);
  };

  const handleUpdate = async (itemData) => {
    await updateItem(editingItem.id, itemData);
    setEditingItem(null);
    setShowForm(false); 
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-primary-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="btn btn-secondary flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Action Bar */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Items</h2>
              <p className="text-gray-600">Manage your items here</p>
            </div>
            
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="btn btn-primary flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Item</span>
              </button>
            )}
          </div>

          {/* Item Form */}
          {showForm && (
            <div className="mb-6">
              <ItemForm
                item={editingItem}
                onSubmit={editingItem ? handleUpdate : handleCreate}
                onCancel={handleCancel}
              />
            </div>
          )}

          {/* Item List */}
          <ItemList
            items={items}
            loading={loading}
            onEdit={handleEdit}
            onDelete={deleteItem}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;