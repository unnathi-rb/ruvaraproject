import { ArtItem, Product, CustomizedItem, Order } from '../types';

export const mockArtItems: ArtItem[] = [
  {
    id: '1',
    title: 'Traditional Madhubani Fish',
    artForm: 'Madhubani',
    imageUrl: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Colorful fish motif representing prosperity',
    artist: 'Sita Devi',
    tags: ['fish', 'prosperity', 'traditional'],
    isSaved: false
  },
  {
    id: '2',
    title: 'Warli Village Life',
    artForm: 'Warli',
    imageUrl: 'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Simple geometric patterns depicting daily life',
    artist: 'Ramesh Hengadi',
    tags: ['village', 'geometric', 'life'],
    isSaved: true
  },
  {
    id: '3',
    title: 'Pithora Horse Painting',
    artForm: 'Pithora',
    imageUrl: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Sacred horse motif for good fortune',
    artist: 'Kalu Rathwa',
    tags: ['horse', 'sacred', 'fortune'],
    isSaved: false
  },
  {
    id: '4',
    title: 'Madhubani Tree of Life',
    artForm: 'Madhubani',
    imageUrl: 'https://images.pexels.com/photos/1194421/pexels-photo-1194421.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Elaborate tree design with birds and flowers',
    artist: 'Bharti Dayal',
    tags: ['tree', 'birds', 'nature'],
    isSaved: false
  },
  {
    id: '5',
    title: 'Warli Dance Festival',
    artForm: 'Warli',
    imageUrl: 'https://images.pexels.com/photos/1194419/pexels-photo-1194419.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Tribal dancers in circular formation',
    artist: 'Jivya Soma Mashe',
    tags: ['dance', 'festival', 'tribal'],
    isSaved: true
  },
  {
    id: '6',
    title: 'Pithora Wall Mural',
    artForm: 'Pithora',
    imageUrl: 'https://images.pexels.com/photos/1194714/pexels-photo-1194714.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Large wall painting with multiple deities',
    artist: 'Lado Rathwa',
    tags: ['mural', 'deities', 'wall'],
    isSaved: false
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Madhubani Silk Painting',
    price: 2500,
    imageUrl: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Paintings',
    description: 'Hand-painted silk canvas with traditional Madhubani motifs',
  },
  {
    id: '2',
    name: 'Warli Art Coffee Mug',
    price: 450,
    imageUrl: 'https://images.pexels.com/photos/1194421/pexels-photo-1194421.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Merchandise',
    description: 'Ceramic mug featuring authentic Warli tribal art',
  },
  {
    id: '3',
    name: 'Madhubani Print Kurta',
    price: 1800,
    imageUrl: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Clothing',
    description: 'Traditional cotton kurta with hand-block Madhubani prints',
  },
  {
    id: '4',
    name: 'Warli Art Saree',
    price: 3500,
    imageUrl: 'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Clothing',
    description: 'Elegant silk saree featuring traditional Warli motifs',
  }
];

export const mockCustomizedItems: CustomizedItem[] = [
  {
    id: '1',
    name: 'Madhubani T-Shirt Design',
    artStyle: 'Madhubani',
    productType: 'T-Shirt',
    imageUrl: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date('2024-01-15')
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    items: [mockProducts[0]],
    total: 2500,
    status: 'delivered',
    date: new Date('2024-01-10')
  }
];