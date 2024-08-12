import React from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { useFavorite } from '../context/FavoriteContext';

interface FavoriteSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
}

const FavoriteSlideOver: React.FC<FavoriteSlideOverProps> = ({ isOpen, onClose }) => {
  const { favoriteItems, toggleFavorite } = useFavorite();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex z-50">
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white w-96 max-w-full shadow-xl p-6 ml-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Favorites</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        {favoriteItems.length > 0 ? (
          <ul className="space-y-4">
            {favoriteItems.map((item) => (
              item && (
                <li key={item._id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <img
                      src={`https://ecomplazza.serveftp.com${item.imageUrl}`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(item)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                  >
                    {favoriteItems.some(favItem => favItem._id === item._id) ? (
                      <HeartIconSolid className="h-6 w-6" />
                    ) : (
                      <HeartIconOutline className="h-6 w-6" />
                    )}
                  </button>
                </li>
              )
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Your favorites list is empty</p>
        )}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300"
          >
            Close
          </button>
          <Link
            to="/favorites"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
          >
            View All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FavoriteSlideOver;
