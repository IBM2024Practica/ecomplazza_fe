import React, { useState } from 'react';
import { Product } from '../types';
import ProductModal from './ProductModal';
import EditProduct from './EditProduct'; // Importă componenta EditProduct
import { useFavorite } from '../context/FavoriteContext';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { PencilIcon } from '@heroicons/react/24/outline'; // Importă icon-ul Pencil
import { useUser } from '../context/UserContext';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Stare pentru modalul de editare
  const { favoriteItems, toggleFavorite } = useFavorite();
  const { user } = useUser();

  console.log('User role:', user?.role); 

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
      } else {
        console.error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    // Actualizează produsul în lista de produse
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          product && product._id ? (
            <div key={product._id} className="bg-white shadow-md rounded-lg p-4 relative">
              <button
                className="absolute top-2 right-2 z-10"
                onClick={() => toggleFavorite(product)}
              >
                {favoriteItems.some(item => item && item._id === product._id) ? (
                  <HeartIconSolid className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartIconOutline className="h-6 w-6 text-gray-500" />
                )}
              </button>

              {user?.role === 'distributor' && (
                <button
                  onClick={() => openEditModal(product)}
                  className="absolute top-2 left-2 z-10 text-gray-500 hover:text-gray-700"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
              )}

              <img
                src={`https://ecomplazza.serveftp.com${product.imageUrl}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onClick={() => openModal(product)}
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-500">{product.description}</p>
              <p className="text-gray-900 font-semibold">${product.price}</p>
            </div>
          ) : (
            <div key={product?._id || Math.random()} className="bg-white shadow-md rounded-lg p-4">
              <p className="text-red-500">Product information unavailable</p>
            </div>
          )
        ))}
      </div>

      {selectedProduct && (
        <>
          <ProductModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={closeModal}
            addToCart={handleAddToCart}
          />

          {user?.role === 'distributor' && (
            <EditProduct
              product={selectedProduct}
              isOpen={isEditModalOpen}
              onClose={closeEditModal}
              onSave={handleSaveProduct}
            />
          )}
        </>
      )}
    </>
  );
};

export default ProductList;
