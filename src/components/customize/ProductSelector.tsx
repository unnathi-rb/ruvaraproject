import React from 'react';
import { Shirt, Coffee, ShoppingBag, Frame } from 'lucide-react';

interface ProductSelectorProps {
  selectedProduct: string | null;
  onProductSelect: (product: string) => void;
}

const products = [
  { name: 'T-Shirt', icon: Shirt, description: 'Cotton t-shirts with custom prints' },
  { name: 'Mug', icon: Coffee, description: 'Ceramic mugs for your morning coffee' },
  { name: 'Tote Bag', icon: ShoppingBag, description: 'Eco-friendly canvas bags' },
  { name: 'Art Print', icon: Frame, description: 'High-quality framed prints' }
];

export default function ProductSelector({ selectedProduct, onProductSelect }: ProductSelectorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Product</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => {
          const IconComponent = product.icon;
          return (
            <button
              key={product.name}
              onClick={() => onProductSelect(product.name)}
              className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                selectedProduct === product.name
                  ? 'border-red-500 bg-red-50'
                  : 'border-amber-200 bg-amber-50 hover:border-amber-300'
              }`}
            >
              <IconComponent className="h-8 w-8 text-red-800 mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
              <p className="text-xs text-gray-600">{product.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}