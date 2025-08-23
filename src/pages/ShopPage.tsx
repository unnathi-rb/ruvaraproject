import React, { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "Art",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", {
        ...formData,
        price: parseFloat(formData.price),
      });
      setFormData({ name: "", description: "", price: "", image: "", category: "Art" });
      fetchProducts();
    } catch (err) {
      console.error("Error adding product", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shop Page</h1>

      {/* Add Product Form */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg space-y-3">
        <input
          type="text"
          placeholder="Title"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full border p-2 rounded"
        />

        {/* Category Dropdown */}
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="Art">Art</option>
          <option value="Print">Print</option>
          <option value="Merchandise">Merchandise</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit" className="bg-red-800 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow">
            {product.image && (
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover rounded mb-2"
      />
    )}
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="font-bold mt-2">₹{product.price}</p>
            <span className="text-xs px-2 py-1 bg-gray-200 rounded">{product.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
