import React, { useState } from 'react';
import ProductModal from './ProductModal';
import EditProduct from './EditProduct';
import { Product } from '../types';
import { HeartIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useFavourites } from '../contexts/FavouritesContext';
import { useUser } from '../App';

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product, size: string, color: string) => void;
  userRole: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart, userRole }) => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const { favouriteItems, toggleFavourite } = useFavourites();
  const { user } = useUser();

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const openEditProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsEditProductOpen(true);
  };

  const closeEditProductModal = () => {
    setIsEditProductOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveProductDetails = (updatedProduct: Product) => {
    setCurrentProducts(prevProducts =>
      prevProducts.map(product =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    closeEditProductModal();
  };

  const isFavourite = (product: Product) =>
    favouriteItems.some((fav) => fav._id === product._id);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg p-4 relative"
            onClick={() => openModal(product)}
          >
            <img
              src={`https://ecomplazza.serveftp.com${product.imageUrl}`} 
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-500">{product.description}</p>
            <p className="text-gray-900 font-semibold">{product.price} USD</p>
            <p className="text-gray-500">Brand: {product.brand}</p>
            <p className="text-gray-500">Material: {product.material}</p>
            <p className="text-gray-500">Color: {product.color}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavourite(product);
              }}
              className={`p-2 ${isFavourite(product) ? 'text-red-500' : 'text-gray-400'} hover:text-red-700`}
            >
              <HeartIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {user?.role === 'distributor' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openEditProductModal(product);
                }}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <PencilIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedProduct && isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
          addToCart={addToCart}
          userRole={userRole}
        />
      )}

      {selectedProduct && isEditProductOpen && (
        <EditProduct
          isOpen={isEditProductOpen}
          onClose={closeEditProductModal}
          product={selectedProduct}
          onSave={handleSaveProductDetails}
        />
      )}
    </>
  );
};

export default ProductList;
