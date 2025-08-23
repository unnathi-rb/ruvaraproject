import React from 'react';
import { Search, User, ShoppingBag, Plus, Palette } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onAddImage: () => void;
}

export default function Header({ currentPage, onPageChange, onAddImage }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-amber-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
   <div className="flex items-center cursor-pointer" onClick={() => onPageChange('home')}>
    <img 
    src="WhatsApp_Image_2025-08-22_at_9.09.15_PM-removebg-preview.png"     
    alt="Ruvara Logo" 
    className="w-10 h-10 mr-3" 
    />
    <h1 
    className="text-2xl font-bold text-red-800 hover:text-red-900 transition-colors"
   >
    Ruvara
  </h1>
</div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onPageChange('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'bg-amber-100 text-red-800'
                  : 'text-gray-700 hover:text-red-800'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onPageChange('customize')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'customize'
                  ? 'bg-amber-100 text-red-800'
                  : 'text-gray-700 hover:text-red-800'
              }`}
            >
              Customize
            </button>
            <button
              onClick={() => onPageChange('shop')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'shop'
                  ? 'bg-amber-100 text-red-800'
                  : 'text-gray-700 hover:text-red-800'
              }`}
            >
              Shop
            </button>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search folk art, artists, styles..."
                className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-full bg-amber-50 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-amber-600" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {currentPage === 'home' && (
              <button
                onClick={onAddImage}
                className="p-2 rounded-full bg-red-800 text-white hover:bg-red-900 transition-colors"
                title="Add new image"
              >
                <Plus className="h-5 w-5" />
              </button>
            )}
            <button className="p-2 rounded-full hover:bg-amber-100 transition-colors">
              <ShoppingBag className="h-5 w-5 text-amber-700" />
            </button>
            <button
              onClick={() => onPageChange('profile')}
              className="p-2 rounded-full hover:bg-amber-100 transition-colors"
            >
              <User className="h-5 w-5 text-amber-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
