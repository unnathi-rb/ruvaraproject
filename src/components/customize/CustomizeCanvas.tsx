import React, { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { ArtItem } from '../../types';
import Draggable from 'react-draggable';

interface CustomizeCanvasProps {
  selectedArtStyles: string[];
  selectedProduct: string;
  savedItems: ArtItem[];
  onSaveCustomization: (item: any) => void;
}

interface CanvasText {
  id: string;
  text: string;
  x: number;
  y: number;
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
  const [canvasTexts, setCanvasTexts] = useState<CanvasText[]>([]);
  const [newText, setNewText] = useState('');

  const handleAddMotif = (img: ArtItem) => {
    if (!addedMotifs.find(m => m.id === img.id)) {
      setAddedMotifs([...addedMotifs, img]);
    }
  };

  const handleAddText = () => {
    if (!newText.trim()) return;
    setCanvasTexts([
      ...canvasTexts,
      { id: Date.now().toString(), text: newText, x: 0, y: 0 },
    ]);
    setNewText('');
  };

  const handleSave = () => {
    if (!customizationName.trim()) return;

    const customizedItem = {
      id: Date.now().toString(),
      name: customizationName,
      artStyles: selectedArtStyles,
      productType: selectedProduct,
      motifs: addedMotifs,
      texts: canvasTexts,
      createdAt: new Date(),
    };

    onSaveCustomization(customizedItem);
    setCustomizationName('');
    setShowSaveDialog(false);
  };

  // Product canvas style
  const productStyle = {
    width: selectedProduct === 'Mug' ? 192 : 256, // 48px vs 64px in Tailwind, adjust as needed
    height: selectedProduct === 'Mug' ? 192 : 320,
    backgroundColor: 'white',
    border:
      selectedProduct === 'Mug'
        ? '4px solid #ccc'
        : '2px solid #ccc',
    borderRadius: selectedProduct === 'Mug' ? '50%' : '12px',
    position: 'relative' as 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

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
          <div style={productStyle}>
            {/* Draggable motifs */}
            {addedMotifs.map(m => (
              <Draggable key={m.id}>
                <img
                  src={m.imageUrl}
                  alt={m.title}
                  className="w-16 h-16 rounded-lg cursor-move"
                />
              </Draggable>
            ))}

            {/* Draggable texts */}
            {canvasTexts.map(t => (
              <Draggable key={t.id}>
                <span className="absolute text-gray-800 font-medium cursor-move">
                  {t.text}
                </span>
              </Draggable>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-lg font-medium mb-2">Select a product to start</p>
          </div>
        )}
      </div>

      {/* Tools */}
      <div className="mt-6 flex flex-col md:flex-row gap-4">
        {/* Add Text */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add text"
            value={newText}
            onChange={e => setNewText(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full"
          />
          <button
            onClick={handleAddText}
            className="px-3 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900"
          >
            Add
          </button>
        </div>

        {/* Motifs selector */}
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
