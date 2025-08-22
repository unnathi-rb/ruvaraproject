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

  const handleStyleToggle = (style: 'Madhubani' | 'Warli' | 'Pithora') => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <StyleSelector 
              selectedStyles={selectedStyles}
              onStyleToggle={handleStyleToggle}
            />
            <ProductSelector
              selectedProduct={selectedProduct}
              onProductSelect={setSelectedProduct}
            />
          </div>
          
          <div className="lg:col-span-2">
            <CustomizeCanvas
              selectedArtStyles={selectedStyles}
              selectedProduct={selectedProduct!}
              onSaveCustomization={onSaveCustomization}
            />
          </div>
        </div>
      </div>
    </div>
  );
}