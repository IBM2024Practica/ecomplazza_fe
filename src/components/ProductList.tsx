// src/components/ProductList.tsx
import React, { useState } from 'react';
import { Product } from '../types';
import ProductModal from './ProductModal';

interface ProductListProps {
  products: Product[];
  // Other props if needed
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg p-4" onClick={() => openModal(product)}>
            <img
              src={`https://ecomplazza.serveftp.com${product.imageUrl}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-500">{product.description}</p>
            <p className="text-gray-900 font-semibold">${product.price}</p>
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
    </>
  );
};

export default ProductList;
