import React from 'react';
import ProfileSection from '../components/profile/ProfileSection';
import { ArtItem, CustomizedItem, Order } from '../types';

interface ProfilePageProps {
  savedItems: ArtItem[];
  customizedItems: CustomizedItem[];
  orders: Order[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function ProfilePage({ 
  savedItems, 
  customizedItems, 
  orders, 
  activeTab, 
  onTabChange 
}: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50">
      <ProfileSection
        savedItems={savedItems}
        customizedItems={customizedItems}
        orders={orders}
        activeTab={activeTab}
        onTabChange={onTabChange} userId={''}      />
    </div>
  );
}