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
  const [image, setImage] = useState<File | null>(null); // Adăugat pentru gestionarea imaginii

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://ecomplazza.serveftp.com/api/products/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
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

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', newProduct.name || '');
      formData.append('price', newProduct.price?.toString() || '');
      formData.append('brand', newProduct.brand || '');
      formData.append('category', newProduct.category || '');
      formData.append('subcategory', newProduct.subcategory || '');
      formData.append('description', newProduct.description || '');
      formData.append('material', newProduct.material || '');
      formData.append('color', newProduct.color || '');
      if (image) {
        formData.append('image', image);
      }
      newProduct.sizes?.forEach((size, index) => {
        formData.append(`sizes[${index}][size]`, size.size || '');
        formData.append(`sizes[${index}][quantity]`, size.quantity?.toString() || '0');
      });

      await axios.post('https://ecomplazza.serveftp.com/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
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
      setImage(null); // Resetare imagine
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
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
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
              {orders.map((order) => (
                <div key={order._id} className="mb-4 p-4 border rounded-md shadow">
                  <h3 className="text-lg font-semibold mb-2">Order ID: {order._id}</h3>
                  <p className="text-sm text-gray-700 mb-1"><strong>User:</strong> {order.user.name}</p>
                  <p className="text-sm text-gray-700 mb-1"><strong>Total:</strong> ${order.total}</p>
                  <p className="text-sm text-gray-700 mb-1"><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-700 mb-1"><strong>Address:</strong> {order.address}</p>
                  <div className="mt-2">
                    <strong>Products:</strong>
                    <ul className="list-disc list-inside">
                      {order.products.map((product: Product) => (
                        <li key={product._id}>{product.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
