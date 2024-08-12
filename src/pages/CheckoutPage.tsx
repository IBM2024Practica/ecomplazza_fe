import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartItem } from '../types';
import Header from '../components/Header';

const CheckoutPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

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
        console.log('Fetched cart data:', data); // Log the fetched cart data
        setCartItems(data);
        calculateTotal(data);
      } else {
        console.error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const calculateTotal = (items: CartItem[]) => {
    const total = items.reduce((acc, item) => acc + (item.productId?.price || 0) * item.quantity, 0);
    setTotal(total);
  };

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem('token');
    const orderData = {
      products: cartItems.map(item => item.productId?._id), // Handle undefined product safely
      total,
      address: `${name} ${surname}, ${address}`,
    };

    try {
      const response = await axios.post('https://ecomplazza.serveftp.com/api/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert('Order placed successfully!');
        navigate('/'); // Redirect to an order confirmation page
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="mb-4 flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{item.productId?.name || 'Unavailable'}</h3>
                    <p className="text-gray-500">Brand: {item.productId?.brand}</p>
                    <p className="text-gray-500">Category: {item.productId?.category}</p>
                    <p className="text-gray-500">Subcategory: {item.productId?.subcategory}</p>
                    <p className="text-gray-500">Description: {item.productId?.description}</p>
                    <p className="text-gray-500">Material: {item.productId?.material}</p>
                    <p className="text-gray-500">Size: {item.selectedSize}, Color: {item.selectedColor}</p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-lg font-semibold">${(item.productId?.price || 0) * item.quantity}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>
            <form onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
