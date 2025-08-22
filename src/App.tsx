import React, { useState } from 'react';
import AuthPage from './components/auth/AuthPage';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import CustomizePage from './pages/CustomizePage';
import ShopPage from './pages/ShopPage';
import ProfilePage from './pages/ProfilePage';
import AddImageModal from './components/home/AddImageModal';
import { mockArtItems, mockProducts, mockCustomizedItems, mockOrders } from './data/mockData';
import { ArtItem, Product, CustomizedItem, Order, User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [artItems, setArtItems] = useState<ArtItem[]>(mockArtItems);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [customizedItems, setCustomizedItems] = useState<CustomizedItem[]>(mockCustomizedItems);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [profileTab, setProfileTab] = useState('saved');
  const [showAddImageModal, setShowAddImageModal] = useState(false);

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser({
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email
    });
  };

  const handleSaveArt = (id: string) => {
    setArtItems(items => 
      items.map(item => 
        item.id === id ? { ...item, isSaved: !item.isSaved } : item
      )
    );
  };

  const handleAddToCart = (id: string) => {
    // In a real app, this would add to cart
    console.log('Added to cart:', id);
  };

  const handleSaveCustomization = (item: CustomizedItem) => {
    setCustomizedItems(items => [...items, item]);
  };

  const handleAddImage = (data: any) => {
    const newItem: ArtItem = {
      id: Date.now().toString(),
      title: data.title,
      artForm: data.artForm,
      imageUrl: data.imageUrl,
      description: data.description,
      artist: data.artist || undefined,
      tags: data.tags,
      isSaved: false
    };
    setArtItems(items => [newItem, ...items]);
  };

  const savedItems = artItems.filter(item => item.isSaved);

  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage artItems={artItems} onSave={handleSaveArt} />;
      case 'customize':
        return <CustomizePage onSaveCustomization={handleSaveCustomization} />;
      case 'shop':
        return <ShopPage products={products} onAddToCart={handleAddToCart} />;
      case 'profile':
        return (
          <ProfilePage 
            savedItems={savedItems}
            customizedItems={customizedItems}
            orders={orders}
            activeTab={profileTab}
            onTabChange={setProfileTab}
          />
        );
      default:
        return <HomePage artItems={artItems} onSave={handleSaveArt} />;
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Header 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        onAddImage={() => setShowAddImageModal(true)}
      />
      {renderCurrentPage()}
      <AddImageModal
        isOpen={showAddImageModal}
        onClose={() => setShowAddImageModal(false)}
        onSubmit={handleAddImage}
      />
    </div>
  );
}

export default App;