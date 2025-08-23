// src/components/CustomizeCanvas.tsx
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ArtItem, Product } from '../../types';

interface CustomizeCanvasProps {
  selectedProduct: Product | null;
  savedItems: ArtItem[];
  onSaveCustomization: (data: any) => void;
}

export default function CustomizeCanvas({
  selectedProduct,
  savedItems,
  onSaveCustomization,
}: CustomizeCanvasProps) {
  const [addedMotifs, setAddedMotifs] = useState<ArtItem[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [texts, setTexts] = useState<string[]>([]);

  // ✅ Add saved motif to canvas
  const handleAddMotif = (item: ArtItem) => {
    setAddedMotifs([...addedMotifs, item]);
  };

  // ✅ Upload custom image
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setUploadedImages((prev) => [...prev, ...fileArray]);
    }
  };

  // ✅ Add text
  const handleAddText = () => {
    const text = prompt('Enter text:');
    if (text) setTexts([...texts, text]);
  };

  // ✅ Save
  const handleSave = () => {
    const data = {
      product: selectedProduct,
      motifs: addedMotifs,
      uploads: uploadedImages,
      texts,
    };
    onSaveCustomization(data);
  };

  // ✅ Decide product base image
  const renderProductBase = () => {
    if (!selectedProduct) return null;

    switch (selectedProduct.category.toLowerCase()) {
      case 'tshirt':
        return <img src="white-blank-t-shirt-front-and-back-template-mockup-design-isolated-vector.jpg" alt="tshirt" className="w-64 h-64 object-contain mx-auto" />;
      case 'mug':
        return <img src="539-5392348_white-mug-transparent-background-clipart-png-download-blank.png" alt="mug" className="w-64 h-64 object-contain mx-auto" />;
      case 'totebag':
        return <img src="png-clipart-tote-bag-graphy-advertising-handbag-bag-white-photography.png" alt="totebag" className="w-64 h-64 object-contain mx-auto" />;
      default:
        return <div className="w-64 h-64 bg-gray-200 mx-auto flex items-center justify-center">No Preview</div>;
    }
  };

  return (
    <div className="p-4">
      {/* Canvas Area */}
      <div className="relative border rounded-lg shadow-md w-80 h-80 bg-white mx-auto">
        {/* Base product */}
        {renderProductBase()}

        {/* Added motifs */}
        {addedMotifs.map((item, idx) => (
          <Draggable key={`motif-${idx}`}>
            <img
              src={item.imageUrl}
              alt={item.title}
              className="absolute w-20 h-20 object-contain cursor-move"
            />
          </Draggable>
        ))}

        {/* Uploaded Images */}
        {uploadedImages.map((url, idx) => (
          <Draggable key={`upload-${idx}`}>
            <img
              src={url}
              alt="upload"
              className="absolute w-20 h-20 object-contain cursor-move"
            />
          </Draggable>
        ))}

        {/* Texts */}
        {texts.map((text, idx) => (
          <Draggable key={`text-${idx}`}>
            <div className="absolute px-2 py-1 bg-white border rounded shadow text-sm cursor-move">
              {text}
            </div>
          </Draggable>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-3 mt-4 justify-center">
        <input type="file" accept="image/*" multiple onChange={handleUploadImage} />
        <button onClick={handleAddText} className="px-3 py-1 bg-blue-500 text-white rounded">
          Add Text
        </button>
        <button onClick={handleSave} className="px-3 py-1 bg-green-500 text-white rounded">
          Save
        </button>
      </div>

      {/* Saved motifs scroll bar */}
      <div className="flex overflow-x-auto mt-4 space-x-2 p-2 border rounded">
        {savedItems.map((item) => (
          <img
            key={item.id}
            src={item.imageUrl}
            alt={item.title}
            onClick={() => handleAddMotif(item)}
            className="w-20 h-20 object-cover cursor-pointer border rounded hover:scale-105 transition"
          />
        ))}
      </div>
    </div>
  );
}
