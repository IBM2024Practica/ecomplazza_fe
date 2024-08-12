// src/components/ProductList.tsx
import React, { useState } from 'react';
import { Product } from '../types';
import ProductModal from './ProductModal';
import EditProduct from './EditProduct'; // Import the EditProduct component
import { PencilIcon } from '@heroicons/react/24/outline'; // Import the PencilIcon from Heroicons
import { useUser } from '../context/UserContext'; // Import the UserContext to access user info

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products: initialProducts }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user } = useUser(); // Get the current user from the context

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = async (productId: string, selectedSize: string, selectedColor: string, quantity: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://ecomplazza.serveftp.com/api/users/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, selectedSize, selectedColor, quantity }),
      });
      if (response.ok) {
        const updatedCart = await response.json();
        console.log('Cart updated:', updatedCart);
        // Optionally update cart state here if needed
      } else {
        console.error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    // Update the product in the local state
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    closeEditModal();
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg p-4 relative">
            <img
              src={`https://ecomplazza.serveftp.com${product.imageUrl}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
              onClick={() => openModal(product)}
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-500">{product.description}</p>
            <p className="text-gray-900 font-semibold">${product.price}</p>
            {/* Pencil icon for editing, visible only for distributors */}
            {user?.role === 'distributor' && (
              <button
                onClick={() => openEditModal(product)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
          addToCart={handleAddToCart}
        />
      )}

      {selectedProduct && user?.role === 'distributor' && (
        <EditProduct
          product={selectedProduct}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSave={handleSaveProduct}
        />
      )}
    </>
  );
};

export default ProductList;
