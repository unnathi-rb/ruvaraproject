// src/components/shop/ProductList.tsx
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types';

interface ProductListProps {
  refresh: boolean;
}

export default function ProductList({ refresh }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/api/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  const handleAddToCart = (id: string) => {
    console.log('Added to cart:', id);
    // later connect this with cart system
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
      ))}
    </div>
  );
}
