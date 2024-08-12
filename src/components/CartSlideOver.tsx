import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Product } from '../types';

interface CartSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartItem {
  productId: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  _id: string; // This is the ID of the cart item
}

const CartSlideOver: React.FC<CartSlideOverProps> = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchCartItems();
    }
  }, [isOpen]);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://ecomplazza.serveftp.com/api/users/cart', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      } else {
        console.error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://ecomplazza.serveftp.com/api/users/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCartItems(updatedCart);
      } else {
        console.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex z-50">
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white w-96 max-w-full shadow-xl p-6 ml-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        {cartItems.length > 0 ? (
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <img
                    src={`https://ecomplazza.serveftp.com${item.productId.imageUrl}`}
                    alt={item.productId.name}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.productId.name || 'Unavailable'}</h3>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x ${item.productId.price ? item.productId.price.toFixed(2) : '0.00'}
                    </p>
                    <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                    <p className="text-sm text-gray-500">Color: {item.selectedColor}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-300"
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty</p>
        )}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300"
          >
            Close
          </button>
          <Link
            to="/checkout"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
          >
            Go to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSlideOver;
