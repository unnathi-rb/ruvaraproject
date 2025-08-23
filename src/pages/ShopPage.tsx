// src/pages/ShopPage.tsx
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/shop/ProductCard';
import ProductUpload from '../components/shop/ProductUpload';
import { Product } from '../types';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [refresh, setRefresh] = useState(false);

  const categories = ['All', 'Paintings', 'Merchandise', 'Clothing'];

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      console.log("Fetching products..."); // 👀 debug
      const res = await fetch('http://localhost:5000/api/products');
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      console.log("Fetched products:", data); // 👀 debug
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  // Filter products by category
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Add to cart handler (dummy for now)
  const handleAddToCart = (id: string) => {
    console.log('Added to cart:', id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Upload Product */}
        <ProductUpload
          onProductAdded={() => {
            console.log("Product added, refreshing list..."); // 👀 debug
            setRefresh((prev) => !prev);
          }}
        />

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 mt-6">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-800 text-white'
                    : 'border border-amber-200 hover:bg-amber-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id || product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
