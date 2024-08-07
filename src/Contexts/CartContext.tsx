// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';

interface CartContextProps {
  cartItems: Product[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (index: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product, size: string, color: string) => {
    setCartItems((prevCartItems) => [
      ...prevCartItems,
      { ...product, selectedSize: size, selectedColor: color, quantity: 1 },
    ]);
  };

  const removeFromCart = (index: number) => {
    setCartItems((currentCartItems) => currentCartItems.filter((_, i) => i !== index));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
