import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  addToCart: (product: any, size: string, color: string) => void;
  userRole: string;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleAddToCart = async () => {
    if (selectedSize && selectedColor) {
      // Update the cart
      addToCart(product, selectedSize, selectedColor);

      // Update the product quantity in the backend
      try {
        const response = await fetch(`http://localhost:5000/api/products/${product._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sizes: product.sizes.map((size: any) => 
              size.size === selectedSize 
                ? { ...size, quantity: size.quantity - 1 }
                : size
            ),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update product quantity');
        }

        const updatedProduct = await response.json();
        console.log('Product updated successfully:', updatedProduct);
        onClose();
      } catch (error) {
        console.error('Error updating product quantity:', error);
        alert('An error occurred while updating the product quantity.');
      }
    } else {
      alert('Please select a size and a color.');
    }
  };

  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="flex justify-between items-start">
                <Dialog.Title className="text-lg font-medium text-gray-900">{product.name}</Dialog.Title>
                <button
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 relative">
                <p className="text-gray-700">{product.description}</p>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Size</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    <option value="">Select size</option>
                    {product.sizes.map((size: any) => (
                      <option key={size.size} value={size.size} disabled={size.quantity === 0}>
                        {size.size} {size.quantity === 0 && '(Out of Stock)'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Color</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  >
                    <option value="">Select color</option>
                    <option value={product.color}>{product.color}</option>
                  </select>
                </div>
                <div className="mt-6">
                  <button
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleAddToCart}
                    disabled={!selectedSize || !selectedColor}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ProductModal;
