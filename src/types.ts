export interface Product {
  _id: string;
  name: string;
  price: number;
  brand: string;
  category: string;
  subcategory: string;
  description: string;
  imageUrl: string;
  material: string;
  color: string;
  favourite: boolean;
  sizes: { size: string; quantity: number }[];
  favouritedBy: string[]; // Array de ObjectId (string)
}

export interface CartItem {
  productId: Product; // Updated to reflect that `productId` is actually a Product object
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  _id: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'distributor' | 'customer';
  date: Date;
  log: boolean;
  cart: CartItem[]; // Updated to use the new CartItem interface
  favourites: string[]; // Array de ObjectId (string)
}

export interface Order {
  _id: string;
  user: string; // ObjectId (string)
  products: string[]; // Array de ObjectId (string)
  total: number;
  date: Date;
  address: string;
}
