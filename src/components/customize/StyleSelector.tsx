import React from 'react';

interface StyleSelectorProps {
  selectedStyles: ('Madhubani' | 'Warli' | 'Pithora')[];
  onStyleSelect: (style: 'Madhubani' | 'Warli' | 'Pithora') => void;
}

const artStyles: { name: 'Madhubani' | 'Warli' | 'Pithora'; imageUrl: string }[] = [
  {
    name: 'Madhubani',
    imageUrl: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Warli',
    imageUrl: 'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Pithora',
    imageUrl: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default function StyleSelector({ selectedStyles, onStyleSelect }: StyleSelectorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Art Style</h2>
      <div className="grid grid-cols-3 gap-4">
        {artStyles.map((style) => (
          <button
            key={style.name}
            onClick={() => onStyleSelect(style.name)}
            className={`p-2 rounded-xl border-2 transition-all hover:scale-105 ${
              selectedStyles.includes(style.name)
                ? 'border-red-500 bg-red-50'
                : 'border-amber-200 bg-amber-50 hover:border-amber-300'
            }`}
          >
            <div
              className="w-full h-24 rounded-lg bg-cover bg-center mb-2"
              style={{ backgroundImage: `url(${style.imageUrl})` }}
            />
            <span className="text-sm font-medium text-gray-900">{style.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
