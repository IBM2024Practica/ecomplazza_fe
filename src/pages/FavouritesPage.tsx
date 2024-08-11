// src/pages/FavouritesPage.tsx
import React from 'react';
import { useFavourites } from '../contexts/FavouritesContext';
import { useNavigate } from 'react-router-dom';

const FavouritesPage: React.FC = () => {
  const { favouriteItems, toggleFavourite } = useFavourites();
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Favourites</h2>
      {favouriteItems.length === 0 ? (
        <p>Your favourites list is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favouriteItems.map((product) => (
            <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={`https://ecomplazza.serveftp.com${product.imageUrl}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-500">{product.description}</p>
              <p className="text-gray-900 font-semibold">{product.price} USD</p>
              <p className="text-gray-500">Brand: {product.brand}</p>
              <p className="text-gray-500">Material: {product.material}</p>
              <p className="text-gray-500">Color: {product.color}</p>
              
              <button
                onClick={() => toggleFavourite(product)}
                className="text-red-500 hover:text-red-700 mt-2"
              >
                Remove from Favourites
              </button>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => navigate('/')} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Back to Home
      </button>
    </div>
  );
};

export default FavouritesPage;
