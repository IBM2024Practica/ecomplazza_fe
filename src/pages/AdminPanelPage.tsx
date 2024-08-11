import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { User, Order } from '../types';

const AdminPanelPage: React.FC = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://ecomplazza.serveftp.com/api/users/get', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://ecomplazza.serveftp.com/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://ecomplazza.serveftp.com/api/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });
      if (response.ok) {
        fetchUsers();
      } else {
        console.error('Error updating role:', await response.text());
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Admin Panel</h1>

        {/* Users Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">All Users</h2>
          <div className="overflow-auto max-h-96">
            <table className="min-w-full bg-white border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-4 border-b border-gray-300 text-left">Username</th>
                  <th className="py-3 px-4 border-b border-gray-300 text-left">Email</th>
                  <th className="py-3 px-4 border-b border-gray-300 text-left">Role</th>
                  <th className="py-3 px-4 border-b border-gray-300 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="py-3 px-4 border-b border-gray-300">{user.username}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{user.email}</td>
                    <td className="py-3 px-4 border-b border-gray-300">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="border border-gray-300 rounded-md p-2 bg-white"
                      >
                        <option value="admin">Admin</option>
                        <option value="distributor">Distributor</option>
                        <option value="customer">Customer</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 border-b border-gray-300">
                      <button
                        onClick={() => handleRoleChange(user._id, 'admin')}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition duration-200"
                      >
                        Make Admin
                      </button>
                      <button
                        onClick={() => handleRoleChange(user._id, 'distributor')}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-700 transition duration-200"
                      >
                        Make Distributor
                      </button>
                      <button
                        onClick={() => handleRoleChange(user._id, 'customer')}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 transition duration-200"
                      >
                        Make Customer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">All Orders</h2>
          <div className="overflow-auto max-h-96">
            <table className="min-w-full bg-white border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-4 border-b border-gray-300 text-left">Order ID</th>
                  <th className="py-3 px-4 border-b border-gray-300 text-left">User Name</th>
                  <th className="py-3 px-4 border-b border-gray-300 text-left">Total Price</th>
                  <th className="py-3 px-4 border-b border-gray-300 text-left">Order Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-100">
                    <td className="py-3 px-4 border-b border-gray-300">{order._id}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{order.user.name}</td>
                    <td className="py-3 px-4 border-b border-gray-300">${order.total.toFixed(2)}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{new Date(order.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanelPage;
