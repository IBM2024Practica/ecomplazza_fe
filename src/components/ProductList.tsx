import React, { useState } from 'react';
import ProductModal from './ProductModal';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product, size: string, color: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
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

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg p-4" onClick={() => openModal(product)}>
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-500">{product.description}</p>
            <p className="text-gray-900 font-semibold">{product.price} USD</p>
            <p className="text-gray-500">Brand: {product.brand}</p>
            <p className="text-gray-500">Material: {product.material}</p>
            <p className="text-gray-500">Color: {product.color}</p>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
          addToCart={addToCart}
        />
      )}
    </>
  );
};

export default ProductList;