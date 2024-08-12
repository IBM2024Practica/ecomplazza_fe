// src/components/ProductModal.tsx
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  addToCart: (productId: string, selectedSize: string, selectedColor: string, quantity: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product._id, selectedSize, selectedColor, quantity);
    onClose(); // Close the modal after adding to the cart
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <p className="text-gray-500 mb-4">{product.description}</p>
        <p className="text-gray-900 font-semibold mb-4">${product.price}</p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Size</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="" disabled>Select size</option>
            {product.sizes.map((size) => (
              <option key={size.size} value={size.size} disabled={size.quantity === 0}>
                {size.size} {size.quantity === 0 && '(Out of Stock)'}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <input
            type="text"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            min="1"
            max={product.sizes.find((size) => size.size === selectedSize)?.quantity || 1}
          />
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          disabled={!selectedSize || quantity < 1}
        >
          Add to Cart
        </button>

        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
