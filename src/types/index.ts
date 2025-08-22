export interface ArtItem {
  id: string;
  title: string;
  artForm: 'Madhubani' | 'Warli' | 'Pithora';
  imageUrl: string;
  description: string;
  artist?: string;
  tags: string[];
  isSaved?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
  inWishlist?: boolean;
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