import React from 'react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

interface CartProps {
  cartItems: Product[];
  onClose: () => void;
  removeFromCart: (index: number) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onClose, removeFromCart }) => {
  const navigate = useNavigate();

  // Calculate the total price
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="relative w-full max-w-md bg-white shadow-xl">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Shopping Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-600">
          <span className="sr-only">Close</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item, index) => (
              <li key={index} className="py-4 flex">
                <div className="flex-shrink-0">
                  <img
                    src={`https://ecomplazza.serveftp.com${item.imageUrl}`} // Adjust the image URL if necessary
                    alt={item.name}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                </div>
                <div className="ml-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">Color: {item.selectedColor}</p>
                    <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{item.price} USD</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(index)} className="text-red-500 hover:text-red-700 mt-2">
                    Remove from Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {cartItems.length > 0 && (
          <div className="mt-4">
            <p className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</p>
            <button onClick={() => navigate('/checkout')} className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Go to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
