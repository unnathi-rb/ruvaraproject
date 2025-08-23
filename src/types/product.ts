export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  exportReady: boolean; // <-- keep required instead of optional
}



