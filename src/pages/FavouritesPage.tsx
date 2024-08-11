import React from 'react';
import { useFavourites } from '../contexts/FavouritesContext';
import { Product } from '../types';

const FavouritesPage: React.FC = () => {
  const { favouriteItems, toggleFavourite } = useFavourites();

  return (
    <div className="relative w-full max-w-md bg-white shadow-xl">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">My Favourites</h2>
      </div>
      <div className="p-4">
        {favouriteItems.length === 0 ? (
          <p className="text-gray-500">Your favourites list is empty.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {favouriteItems.map((product: Product) => (
              <li key={product._id} className="py-4 flex">
                <div className="flex-shrink-0">
                  <img
                    src={`https://ecomplazza.serveftp.com${product.imageUrl}`}
                    alt={product.name}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                </div>
                <div className="ml-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">Color: {product.color}</p>
                    <p className="text-sm text-gray-500">Material: {product.material}</p>
                    <p className="text-sm text-gray-500">Brand: {product.brand}</p>
                    <p className="text-sm font-medium text-gray-900">{product.price} USD</p>
                  </div>
                  <button
                    onClick={() => toggleFavourite(product)}
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    Remove from Favourites
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;
