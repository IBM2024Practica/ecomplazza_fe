// src/contexts/FavouritesContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { Product } from '../types';

interface FavouritesContextProps {
  favouriteItems: Product[];
  toggleFavourite: (product: Product) => void;
}

const FavouritesContext = createContext<FavouritesContextProps | undefined>(undefined);

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favouriteItems, setFavouriteItems] = useState<Product[]>([]);

  const toggleFavourite = (product: Product) => {
    setFavouriteItems((prevFavourites) => {
      if (prevFavourites.some((fav) => fav._id === product._id)) {
        return prevFavourites.filter((fav) => fav._id !== product._id);
      } else {
        return [...prevFavourites, product];
      }
    });
  };

  return (
    <FavouritesContext.Provider value={{ favouriteItems, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};
