import React, { useState } from 'react';
import StyleSelector from '../components/customize/StyleSelector';
import ProductSelector from '../components/customize/ProductSelector';
import CustomizeCanvas from '../components/customize/CustomizeCanvas';
import { CustomizedItem } from '../types';

interface CustomizePageProps {
  onSaveCustomization: (item: CustomizedItem) => void;
}

export default function CustomizePage({ onSaveCustomization }: CustomizePageProps) {
  const [selectedStyles, setSelectedStyles] = useState<('Madhubani' | 'Warli' | 'Pithora')[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [customizationName, setCustomizationName] = useState('');

  const handleStyleToggle = (style: 'Madhubani' | 'Warli' | 'Pithora') => {
    setSelectedStyles(prev =>
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const handleSave = () => {
    if (!customizationName.trim() || !selectedProduct || selectedStyles.length === 0) return;

    const newItem: CustomizedItem = {
      id: Date.now().toString(),
      name: customizationName,
      productType: selectedProduct,
      artStyle: selectedStyles[0], // or multiple if you want
      imageUrl: `https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400`,
      createdAt: new Date(),
    };

    onSaveCustomization(newItem);
    setCustomizationName('');
    setSelectedStyles([]);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Panel: Style & Product Selection */}
          <div className="space-y-6">
            <StyleSelector selectedStyles={selectedStyles} onStyleToggle={handleStyleToggle} />
            <ProductSelector selectedProduct={selectedProduct} onProductSelect={setSelectedProduct} />

            {/* Name & Save */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <input
                type="text"
                value={customizationName}
                onChange={(e) => setCustomizationName(e.target.value)}
                placeholder="Enter design name"
                className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent mb-3"
              />
              <button
                onClick={handleSave}
                disabled={!customizationName.trim() || !selectedProduct || selectedStyles.length === 0}
                className="w-full px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Design
              </button>
            </div>
          </div>

          {/* Right Panel: Live Preview */}
          <div className="lg:col-span-2">
            <CustomizeCanvas
              selectedArtStyles={selectedStyles}
              selectedProduct={selectedProduct || ''}
              onSaveCustomization={onSaveCustomization} // optional, already saving from left
            />
          </div>
        </div>
      </div>
    </div>
  );
}
