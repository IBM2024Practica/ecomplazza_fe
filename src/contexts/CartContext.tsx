import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../types';
import { useUser } from '../contexts/UserContext'; 

interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useUser(); // Obține utilizatorul curent
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (user) {
      const savedCartItems = localStorage.getItem(`cartItems_${user._id}`);
      if (savedCartItems) {
        setCartItems(JSON.parse(savedCartItems));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`cartItems_${user._id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = (product: Product, size: string, color: string) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(
        (item) => item.selectedSize === size && item.selectedColor === color
      );

      if (existingItemIndex > -1) {
        // Update quantity if item already exists
        const updatedItems = [...prevCartItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      }

      // Add new item to cart
      return [
        ...prevCartItems,
        { ...product, selectedSize: size, selectedColor: color, quantity: 1 },
      ];
    });
  };

  const removeFromCart = (index: number) => {
    setCartItems((currentCartItems) => currentCartItems.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
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
