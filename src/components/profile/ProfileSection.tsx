import React, { useEffect, useState } from 'react';
import { BookmarkPlus, Palette, Package, User, CheckCircle } from 'lucide-react';
import { ArtItem, CustomizedItem, Order } from '../../types';
import axios from 'axios';

interface ProfileSectionProps {
  userId: string;
  savedItems: ArtItem[];
  customizedItems: CustomizedItem[];
  orders: Order[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function ProfileSection({ 
  userId, 
  savedItems, 
  customizedItems, 
  orders, 
  activeTab, 
  onTabChange 
}: ProfileSectionProps) {
  const [userArtCount, setUserArtCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<{ name?: string; bio?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const resUser = await axios.get(`http://localhost:5000/api/users/${userId}`);
        const resArt = await axios.get(`http://localhost:5000/api/artworks?userId=${userId}`);
        setCurrentUser(resUser.data);
        setUserArtCount(resArt.data.length);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setCurrentUser(null);
        setUserArtCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [userId]);

  const tabs = [
    { id: 'saved', name: 'Saved Photos', icon: BookmarkPlus, count: savedItems.length },
    { id: 'customized', name: 'My Designs', icon: Palette, count: customizedItems.length },
    { id: 'orders', name: 'Order History', icon: Package, count: orders.length }
  ];

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 flex items-center gap-6">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center relative text-xl font-bold text-red-800">
          {currentUser?.name ? currentUser.name[0] : 'U'}
          {userArtCount >= 3 && (
            <CheckCircle className="absolute -bottom-1 -right-1 h-6 w-6 text-green-500" />
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {currentUser?.name || 'Your Profile'}
          </h1>
          {currentUser?.bio && (
            <p className="text-gray-600 mb-1">{currentUser.bio}</p>
          )}
          <p className="text-gray-600 mb-1">
            You have posted <span className="font-semibold">{userArtCount}</span> artworks
          </p>
          {userArtCount >= 3 && (
            <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
              Verified Artist
              <CheckCircle className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex-1 py-4 px-6 text-center border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600 bg-red-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'saved' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {savedItems.length > 0 ? savedItems.map((item) => (
                <div key={item.id} className="rounded-lg overflow-hidden shadow-sm bg-gray-50">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
                  <div className="p-2 text-sm font-medium">{item.title}</div>
                </div>
              )) : (
                <p className="text-gray-500">No saved images yet.</p>
              )}
            </div>
          )}

          {activeTab === 'customized' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {customizedItems.length > 0 ? customizedItems.map((item) => (
                <div key={item.id} className="rounded-lg overflow-hidden shadow-sm bg-gray-50">
                 {/* <img src={item.previewImage} alt={item.name} className="w-full h-40 object-cover" />*/}
                  <div className="p-2 text-sm font-medium">{item.name}</div>
                </div>
              )) : (
                <p className="text-gray-500">No designs yet.</p>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length > 0 ? orders.map((order) => (
                <div key={order.id} className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">Status: {order.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{order.total}</p>
                    <p className="text-sm text-gray-500">{order.items.length} items</p>
                  </div>
                </div>
              )) : (
                <p className="text-gray-500">No orders yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
