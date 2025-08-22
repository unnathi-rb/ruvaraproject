import React from 'react';
import { BookmarkPlus, Palette, Package, User } from 'lucide-react';
import { ArtItem, CustomizedItem, Order } from '../../types';

interface ProfileSectionProps {
  savedItems: ArtItem[];
  customizedItems: CustomizedItem[];
  orders: Order[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function ProfileSection({ 
  savedItems, 
  customizedItems, 
  orders, 
  activeTab, 
  onTabChange 
}: ProfileSectionProps) {
  const tabs = [
    { id: 'saved', name: 'Saved Photos', icon: BookmarkPlus, count: savedItems.length },
    { id: 'customized', name: 'My Designs', icon: Palette, count: customizedItems.length },
    { id: 'orders', name: 'Order History', icon: Package, count: orders.length }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-red-800" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Profile</h1>
            <p className="text-gray-600">Discover and customize beautiful Indian folk art</p>
          </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-xl overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.artForm}</p>
                  </div>
                </div>
              ))}
              {savedItems.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <BookmarkPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No saved photos yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'customized' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customizedItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-xl overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      {item.artStyle} on {item.productType}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Created {item.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {customizedItems.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Palette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No custom designs yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        {order.date.toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-gray-700">{item.name}</span>
                        <span className="font-medium">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{order.total}</span>
                    </div>
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No orders yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}