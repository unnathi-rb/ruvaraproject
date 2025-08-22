import React from 'react';
import MasonryGrid from '../components/home/MasonryGrid';
import { ArtItem } from '../types';

interface HomePageProps {
  artItems: ArtItem[];
  onSave: (id: string) => void;
}

export default function HomePage({ artItems, onSave }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50">
      <div className="pt-8 pb-16">
        {/* Art Grid */}
        <MasonryGrid items={artItems} onSave={onSave} />
      </div>
    </div>
  );
}