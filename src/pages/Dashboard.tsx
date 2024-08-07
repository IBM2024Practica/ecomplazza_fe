// src/pages/DashboardPage.tsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../App';
import axios from 'axios';
import { Product, Order } from '../types';

const DashboardPage: React.FC = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { user } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    brand: '',
    category: '',
    subcategory: '',
    description: '',
    material: '',
    color: '',
    sizes: [{ size: '', quantity: 0 }],
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/products', newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
      setNewProduct({
        name: '',
        price: 0,
        brand: '',
        category: '',
        subcategory: '',
        description: '',
        material: '',
        color: '',
        sizes: [{ size: '', quantity: 0 }],
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <Header cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Add a New Product</h2>
            <form onSubmit={handleAddProduct} className="bg-white p-4 rounded shadow">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Brand</label>
                <input
                  type="text"
                  value={newProduct.brand}
                  onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                <input
                  type="text"
                  value={newProduct.subcategory}
                  onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Material</label>
                <input
                  type="text"
                  value={newProduct.material}
                  onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Color</label>
                <input
                  type="text"
                  value={newProduct.color}
                  onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              {/* <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Sizes</label>
                {newProduct.sizes.map((size, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={size.size}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          sizes: newProduct.sizes.map((s, i) =>
                            i === index ? { ...s, size: e.target.value } : s
                          ),
                        })
                      }
                      placeholder="Size"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    <input
                      type="number"
                      value={size.quantity}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          sizes: newProduct.sizes.map((s, i) =>
                            i === index ? { ...s, quantity: parseInt(e.target.value, 10) } : s
                          ),
                        })
                      }
                      placeholder="Quantity"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setNewProduct({
                          ...newProduct,
                          sizes: newProduct.sizes.filter((_, i) => i !== index),
                        })
                      }
                      className="mt-1 bg-red-500 text-white p-2 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setNewProduct({
                      ...newProduct,
                      sizes: [...newProduct.sizes, { size: '', quantity: 0 }],
                    })
                  }
                  className="mt-2 bg-blue-500 text-white p-2 rounded-md"
                >
                  Add Size
                </button>
              </div> */}
              <button
                type="submit"
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                Add Product
              </button>
            </form>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">View All Orders</h2>
            <div className="bg-white p-4 rounded shadow overflow-auto max-h-96">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2">Order ID</th>
                    <th className="py-2">User</th>
                    <th className="py-2">Products</th>
                    <th className="py-2">Total</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="py-2">{order._id}</td>
                      <td className="py-2">{order.user.name}</td>
                      <td className="py-2">
                        <ul>
                          {order.products.map((product: Product) => (
                            <li key={product._id}>{product.name}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-2">${order.total}</td>
                      <td className="py-2">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="py-2">{order.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
