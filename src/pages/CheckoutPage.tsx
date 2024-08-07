// src/pages/CheckoutPage.tsx
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SignInForm from '../components/SignInForm';
import SlideOver from '../components/SlideOver';
import { Product } from '../types';
import { useUser } from '../App';

const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const { user } = useUser();
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  const handleCheckout = async () => {
    if (!user) {
      setIsSignInOpen(true);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://ecomplazza.serveftp.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          products: cartItems.map(item => item._id),
          total: totalPrice,
          address,
        }),
      });

      if (response.ok) {
        alert('Order placed successfully!');
        clearCart();
        navigate('/');
      } else {
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <Header cartItems={cartItems} addToCart={() => {}} removeFromCart={() => {}} />
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div>
            <ul className="divide-y divide-gray-200 mb-4">
              {cartItems.map((item, index) => (
                <li key={index} className="py-4 flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">Color: {item.selectedColor}</p>
                    <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{item.price} USD</p>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</p>
              <div className="mt-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Shipping Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Complete Purchase
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <SlideOver isOpen={isSignInOpen} setIsOpen={setIsSignInOpen} title="Sign In">
        <SignInForm setIsOpen={setIsSignInOpen} setUser={() => {}} />
      </SlideOver>
    </div>
  );
};

export default CheckoutPage;
