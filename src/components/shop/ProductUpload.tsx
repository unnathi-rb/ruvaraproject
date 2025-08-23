import React, { useState } from 'react';

interface ProductUploadProps {
  onProductAdded: () => void;
}

export default function ProductUpload({ onProductAdded }: ProductUploadProps) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    exportReady: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
        }),
      });

      if (res.ok) {
        setForm({
          name: '',
          description: '',
          price: '',
          category: '',
          imageUrl: '',
          exportReady: false,
        });
        onProductAdded();
      }
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl p-6"
    >
      <h2 className="text-lg font-semibold mb-4">Upload New Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border rounded p-2 mb-2 w-full"
        required
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="border rounded p-2 mb-2 w-full"
      />

      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="border rounded p-2 mb-2 w-full"
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="border rounded p-2 mb-2 w-full"
        required
      />

      <input
        type="text"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        className="border rounded p-2 mb-2 w-full"
      />

      {/* ✅ Export Ready Checkbox */}
      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={form.exportReady}
          onChange={(e) =>
            setForm({ ...form, exportReady: e.target.checked })
          }
        />
        <span>Export Ready</span>
      </label>

      <button
        type="submit"
        className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        Upload
      </button>
    </form>
  );
}
