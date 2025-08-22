import React from 'react';
import ArtCard from './ArtCard';
import { ArtItem } from '../../types';

interface MasonryGridProps {
  items: ArtItem[];
  onSave: (id: string) => void;
}

export default function MasonryGrid({ items, onSave }: MasonryGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {items.map((item) => (
          <div key={item.id} className="break-inside-avoid">
            <ArtCard item={item} onSave={onSave} />
          </div>
        ))}
      </div>
    </div>
  );
}