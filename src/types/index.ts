
// src/types/index.ts
export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  exportReady: boolean;
}

export interface ArtItem {
  id: string;
  title: string;
  artForm: 'Madhubani' | 'Warli' | 'Pithora';
  imageUrl: string;
  description: string;
  artist?: string;
  tags: string[];
  isSaved?: boolean;
  userId: string;
}

export interface CustomizedItem {
  id: string;
  name: string;
  artStyle: 'Madhubani' | 'Warli' | 'Pithora';
  productType: string;
  imageUrl: string;
  createdAt: Date;
}

export interface Order {
  id: string;
  items: Product[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  date: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
