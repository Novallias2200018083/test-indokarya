import { Edit2, Trash2, Calendar } from 'lucide-react';

const ItemList = ({ items, loading, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (e) {
        return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="card p-8">
        <div className="flex justify-center items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
          <span className="text-gray-600">Loading items...</span>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="card p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items yet</h3>
          <p className="text-gray-500 mb-4">
            Get started by creating your first item. Click the "Add Item" button to begin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.id} className="card p-6 group hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {item.title}
            </h3>
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => onEdit(item)}
                className="p-1 text-gray-400 hover:text-primary-500 transition-colors"
                title="Edit item"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {item.description && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {item.description}
            </p>
          )}
          
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Created {formatDate(item.created_at)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;