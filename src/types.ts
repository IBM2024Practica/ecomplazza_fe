// src/types.ts
export interface Product {
    _id: string;
    name: string;
    price: number;
    brand: string;
    category: string;
    subcategory: string;
    description: string;
    material: string;
    color: string;
    sizes: Array<{
      size: string;
      quantity: number;
    }>;
    selectedSize?: string;
    selectedColor?: string;
    quantity?: number;
  }
  
  export interface Order {
    _id: string;
    user: { name: string };
    products: Product[];
    total: number;
    date: string;
    address: string;
  }