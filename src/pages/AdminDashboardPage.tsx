import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'distributor' | 'customer';
}

interface Order {
  _id: string;
  user: User;
  products: string[];
  total: number;
  address: string;
  date: Date;
}

const AdminDashboardPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedUserRole, setSelectedUserRole] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://ecomplazza.serveftp.com/api/users/get', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://ecomplazza.serveftp.com/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://ecomplazza.serveftp.com/api/users/${userId}/role`,
        { role },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSelectedUserRole((prev) => ({ ...prev, [userId]: role }));
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">User Management</h2>
            <ul>
              {users.map((user) => (
                <li key={user._id} className="mb-4 p-4 border rounded shadow">
                  <h3 className="text-lg font-semibold">{user.username}</h3>
                  <p className="text-gray-500">{user.email}</p>
                  <p className="text-gray-500">Current Role: {user.role}</p>
                  <select
                    value={selectedUserRole[user._id] || user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="mt-2 p-2 border rounded"
                  >
                    <option value="customer">Customer</option>
                    <option value="distributor">Distributor</option>
                    <option value="admin">Admin</option>
                  </select>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Orders</h2>
            <ul>
              {orders.map((order) => (
                <li key={order._id} className="mb-4 p-4 border rounded shadow">
                  <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
                  <p className="text-gray-500">User: {order.user.username}</p>
                  <p className="text-gray-500">Total: ${order.total}</p>
                  <p className="text-gray-500">Address: {order.address}</p>
                  <p className="text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
