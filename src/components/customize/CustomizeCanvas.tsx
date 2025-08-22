import React, { useState } from 'react';
import { Save, Download, RotateCcw } from 'lucide-react';

interface CustomizeCanvasProps {
  selectedArtStyles: ('Madhubani' | 'Warli' | 'Pithora')[];
  selectedProduct: string;
  onSaveCustomization: (item: any) => void;
}

export default function CustomizeCanvas({ 
  selectedArtStyles, 
  selectedProduct, 
  onSaveCustomization 
}: CustomizeCanvasProps) {
  const [customizationName, setCustomizationName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const getArtStylePattern = (style: string) => {
    switch (style) {
      case 'Madhubani':
        return 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400';
      case 'Warli':
        return 'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=400';
      case 'Pithora':
        return 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=400';
      default:
        return 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400';
    }
  };

  const handleSave = () => {
    if (!customizationName.trim()) return;
    
    const customizedItem = {
      id: Date.now().toString(),
      name: customizationName,
      artStyle: selectedArtStyles[0] || 'Madhubani',
      productType: selectedProduct,
      imageUrl: getArtStylePattern(selectedArtStyles[0] || 'Madhubani'),
      createdAt: new Date()
    };

    onSaveCustomization(customizedItem);
    setCustomizationName('');
    setShowSaveDialog(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Design Canvas</h2>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            <RotateCcw className="h-5 w-5 text-gray-600" />
          </button>
          <button 
            onClick={() => setShowSaveDialog(true)}
            className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-colors flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Design
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative bg-amber-50 rounded-xl min-h-96 flex items-center justify-center border-2 border-dashed border-amber-200">
        {selectedProduct && selectedArtStyles.length > 0 ? (
          <div className="relative">
            {/* Product Template */}
            <div className={`w-64 h-80 bg-white rounded-lg shadow-lg flex items-center justify-center ${
              selectedProduct === 'T-Shirt' ? 'bg-gray-100' :
              selectedProduct === 'Mug' ? 'bg-white border-4 border-gray-200 rounded-full w-48 h-48' :
              selectedProduct === 'Tote Bag' ? 'bg-amber-100' : 'bg-white'
            }`}>
              {/* Art Style Overlay */}
              <div className="w-40 h-40 bg-cover bg-center rounded-lg opacity-80"
                   style={{ backgroundImage: `url(${getArtStylePattern(selectedArtStyles[0])})` }}>
              </div>
            </div>
            
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-md">
                {selectedArtStyles[0]} on {selectedProduct}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-lg font-medium mb-2">Select an art style and product to start</p>
            <p className="text-sm">Your customization will appear here</p>
          </div>
        )}
      </div>

      {/* Tools */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <button className="p-3 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors text-center">
          <div className="text-sm font-medium text-gray-700">Add Text</div>
        </button>
        <button className="p-3 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors text-center">
          <div className="text-sm font-medium text-gray-700">Add Motif</div>
        </button>
        <button className="p-3 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors text-center">
          <div className="text-sm font-medium text-gray-700">Change Colors</div>
        </button>
        <button className="p-3 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors text-center">
          <div className="text-sm font-medium text-gray-700">Resize</div>
        </button>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Save Your Design</h3>
            <input
              type="text"
              value={customizationName}
              onChange={(e) => setCustomizationName(e.target.value)}
              placeholder="Enter design name"
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!customizationName.trim()}
                className="flex-1 px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}