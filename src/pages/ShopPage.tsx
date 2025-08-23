import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/shop/ProductCard";
import { Product } from "../types";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ name: "", price: "", imageUrl: "", category: "", description: "" });

  // Fetch products from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  // Handle upload
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/products", {
      ...form,
      price: Number(form.price),
    });
    setForm({ name: "", price: "", imageUrl: "", category: "", description: "" });

    // Refresh list
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Upload Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border p-2 rounded" />
          <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="border p-2 rounded col-span-2" />
          <input type="text" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border p-2 rounded col-span-2" />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border p-2 rounded col-span-2" />
          <button type="submit" className="bg-red-700 text-white py-2 rounded col-span-2 hover:bg-red-800">
            Add Product
          </button>
        </form>
      </div>

      {/* Display Products */}
      <h2 className="text-2xl font-bold mb-4">Available Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
