import React, { useState } from 'react';
import { Share2, BookmarkPlus } from 'lucide-react';
import { ArtItem } from '../../types';

interface ArtCardProps {
  item: ArtItem;
  onSave: (id: string) => void;
}

export default function ArtCard({ item, onSave }: ArtCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={item.imageUrl}
          alt={item.title}
          className={`w-full h-auto object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="w-full h-48 bg-amber-50 animate-pulse"></div>
        )}
        
        {/* Overlay on Hover */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={() => onSave(item.id)}
              className={`p-2 rounded-full transition-colors ${
                item.isSaved
                  ? 'bg-red-800 text-white'
                  : 'bg-white text-gray-700 hover:bg-amber-100'
              }`}
            >
              <BookmarkPlus className={`h-4 w-4 ${item.isSaved ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 rounded-full bg-white text-gray-700 hover:bg-amber-100 transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.artForm === 'Madhubani'
              ? 'bg-red-100 text-red-800'
              : item.artForm === 'Warli'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-indigo-100 text-indigo-800'
          }`}>
            {item.artForm}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
          {item.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {item.description}
        </p>
        
        {item.artist && (
          <p className="text-xs text-amber-700 font-medium">
            by {item.artist}
          </p>
        )}
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}