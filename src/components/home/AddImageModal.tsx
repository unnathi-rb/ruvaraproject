import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

interface AddImageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddImageModal({ isOpen, onClose }: AddImageModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    artForm: 'Madhubani',
    description: '',
    artist: '',
    tags: '',
    imageUrl: '',
  });

  const [otherArtForm, setOtherArtForm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalArtForm =
      formData.artForm === 'Others' && otherArtForm.trim()
        ? otherArtForm.trim()
        : formData.artForm;

    const newArtwork = {
      ...formData,
      artForm: finalArtForm,
      tags: formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/artworks', newArtwork);
      setLoading(false);

      // Reset form
      setFormData({
        title: '',
        artForm: 'Madhubani',
        description: '',
        artist: '',
        tags: '',
        imageUrl: '',
      });
      setOtherArtForm('');
      onClose();
    } catch (err) {
      console.error('Error adding artwork:', err);
      setLoading(false);
    }
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
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
              placeholder="Enter artwork title"
            />
          </div>

          {/* Art Form */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Art Form</label>
            <select
              value={formData.artForm}
              onChange={(e) => setFormData({ ...formData, artForm: e.target.value })}
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
            >
              <option value="Madhubani">Madhubani</option>
              <option value="Warli">Warli</option>
              <option value="Pithora">Pithora</option>
              <option value="Channapatna Toys">Channapatna Toys</option>
              <option value="Bidriware">Bidriware</option>
              <option value="Terracotta Art">Terracotta Art</option>
              <option value="Tanjore Painting">Tanjore Painting</option>
              <option value="Kasuti Embroidery">Kasuti Embroidery</option>
              <option value="Kalamkari">Kalamkari</option>
              <option value="Others">Others</option>
            </select>

            {formData.artForm === 'Others' && (
              <input
                type="text"
                placeholder="Enter your art form"
                value={otherArtForm}
                onChange={(e) => setOtherArtForm(e.target.value)}
                className="mt-2 w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
              />
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
              placeholder="Describe the artwork"
            />
          </div>

          {/* Artist */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Artist (Optional)</label>
            <input
              type="text"
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
              placeholder="Artist name"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
              placeholder="traditional, colorful, nature"
            />
          </div>

          {/* Buttons */}
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
              disabled={loading}
              className="flex-1 px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-colors"
            >
              {loading ? 'Adding...' : 'Add Artwork'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
