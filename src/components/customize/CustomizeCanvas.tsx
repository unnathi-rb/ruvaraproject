import React, { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { ArtItem } from '../../types';

interface CustomizeCanvasProps {
  selectedArtStyles: string[]; // <- dynamic art styles
  selectedProduct: string;
  savedItems: ArtItem[];
  onSaveCustomization: (item: any) => void;
}

export default function CustomizeCanvas({
  selectedArtStyles,
  selectedProduct,
  savedItems,
  onSaveCustomization,
}: CustomizeCanvasProps) {
  const [customizationName, setCustomizationName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [addedMotifs, setAddedMotifs] = useState<ArtItem[]>([]);

  const handleAddMotif = (img: ArtItem) => {
    if (!addedMotifs.find(m => m.id === img.id)) {
      setAddedMotifs([...addedMotifs, img]);
    }
  };

  const handleSave = () => {
    if (!customizationName.trim()) return;

    const customizedItem = {
      id: Date.now().toString(),
      name: customizationName,
      artStyles: selectedArtStyles,
      productType: selectedProduct,
      motifs: addedMotifs,
      createdAt: new Date(),
    };

    onSaveCustomization(customizedItem);
    setCustomizationName('');
    setShowSaveDialog(false);
  };

  // Pick the first art style available from user saved images, if any
  const artStyleImage = selectedArtStyles.length
    ? savedItems.find(img =>
        selectedArtStyles.some(style => img.title.includes(style))
      )?.imageUrl
    : '';

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
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

      {/* Canvas */}
      <div className="relative bg-amber-50 rounded-xl min-h-96 flex items-center justify-center border-2 border-dashed border-amber-200">
        {selectedProduct ? (
          <div className="relative">
            {/* Product Template */}
            <div
              className={`w-64 h-80 flex items-center justify-center rounded-lg shadow-lg ${
                selectedProduct === 'T-Shirt'
                  ? 'bg-gray-100'
                  : selectedProduct === 'Mug'
                  ? 'bg-white border-4 border-gray-200 rounded-full w-48 h-48'
                  : selectedProduct === 'Tote Bag'
                  ? 'bg-amber-100'
                  : 'bg-white'
              }`}
            >
              {/* Art Style Overlay */}
              {artStyleImage && (
                <div
                  className="w-40 h-40 bg-cover bg-center rounded-lg opacity-80"
                  style={{ backgroundImage: `url(${artStyleImage})` }}
                ></div>
              )}

              {/* Added Motifs */}
              {addedMotifs.map(m => (
                <img
                  key={m.id}
                  src={m.imageUrl}
                  alt={m.title}
                  className="absolute w-16 h-16 rounded-lg opacity-90"
                />
              ))}
            </div>

            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-md">
                {selectedArtStyles.join(', ')} on {selectedProduct}
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

      {/* Tools / Motifs */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-700 mb-2">Your Saved Art</h4>
        <div className="flex gap-2 overflow-x-auto py-2">
          {savedItems.map(img => (
            <img
              key={img.id}
              src={img.imageUrl}
              alt={img.title}
              className="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 hover:border-red-500"
              onClick={() => handleAddMotif(img)}
            />
          ))}
        </div>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Save Your Design</h3>
            <input
              type="text"
              value={customizationName}
              onChange={e => setCustomizationName(e.target.value)}
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
