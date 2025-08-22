import React, { useState } from 'react';
import { X, Upload, Image } from 'lucide-react';

interface AddImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function AddImageModal({ isOpen, onClose, onSubmit }: AddImageModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    artForm: 'Madhubani' as 'Madhubani' | 'Warli' | 'Pithora',
    description: '',
    artist: '',
    tags: '',
    imageUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    });
    setFormData({
      title: '',
      artForm: 'Madhubani',
      description: '',
      artist: '',
      tags: '',
      imageUrl: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-amber-100">
          <h2 className="text-xl font-semibold text-gray-900">Add New Artwork</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
              placeholder="Enter artwork title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Art Form
            </label>
            <select
              value={formData.artForm}
              onChange={(e) => setFormData({ ...formData, artForm: e.target.value as any })}
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
            >
              <option value="Madhubani">Madhubani</option>
              <option value="Warli">Warli</option>
              <option value="Pithora">Pithora</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
              placeholder="Describe the artwork"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Artist (Optional)
            </label>
            <input
              type="text"
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
              placeholder="Artist name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
              placeholder="traditional, colorful, nature"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-colors"
            >
              Add Artwork
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}