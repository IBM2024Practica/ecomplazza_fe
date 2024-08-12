import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useUser } from '../context/UserContext'; // Asigură-te că utilizezi contextul corect
import axios from 'axios';
import { Product } from '../types'; // Tipurile pe care le folosești

const DashboardPage: React.FC = () => {
  const { user } = useUser(); // Obține utilizatorul curent
  const [products, setProducts] = useState<Product[]>([]);
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
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    fetchProducts(); // Încarcă produsele existente la inițializarea paginii
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://ecomplazza.serveftp.com/api/products/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
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

      fetchProducts(); // Actualizează lista de produse după adăugare
      resetForm(); // Resetează formularul după adăugare
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const resetForm = () => {
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
    setImage(null);
  };

  const handleAddSize = () => {
    setNewProduct(prev => ({
      ...prev,
      sizes: [...(prev.sizes || []), { size: '', quantity: 0 }],
    }));
  };

  const handleSizeChange = (index: number, field: 'size' | 'quantity', value: string) => {
    setNewProduct(prev => {
      const sizes = [...(prev.sizes || [])];
      sizes[index] = { ...sizes[index], [field]: field === 'quantity' ? parseInt(value) : value };
      return { ...prev, sizes };
    });
  };

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <section>
          <h2 className="text-2xl font-bold mb-4">Add a New Product</h2>
          <form onSubmit={handleAddProduct} className="bg-white p-4 rounded shadow">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={newProduct.name || ''}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                value={newProduct.price || ''}
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
                value={newProduct.description || ''}
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Sizes</label>
              {newProduct.sizes?.map((size, index) => (
                <div key={index} className="flex gap-4 mb-2">
                  <input
                    type="text"
                    value={size.size || ''}
                    onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                    placeholder="Size"
                    className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  <input
                    type="number"
                    value={size.quantity || 0}
                    onChange={(e) => handleSizeChange(index, 'quantity', e.target.value)}
                    placeholder="Quantity"
                    className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSize}
                className="mt-2 bg-green-600 text-white py-1 px-2 rounded-md hover:bg-green-700"
              >
                Add Another Size
              </button>
            </div>
            <button
              type="submit"
              className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Add Product
            </button>
          </form>
        </section>
      </main>
     
    </div>
  );
};

export default DashboardPage;
