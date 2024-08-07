import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Filter from '../components/Filter';
import { getProductsByCategory } from '../api/api';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type Product = {
  name: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  price: string;
};

const ProductList = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!category || !subcategory) {
      setError('No category or subcategory provided.');
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const data = await getProductsByCategory(category, subcategory);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  let filterCategory: 'clothes' | 'accessories' | 'carry' = 'clothes';
  if (subcategory === 'accessories') {
    filterCategory = 'accessories';
  } else if (subcategory === 'carry') {
    filterCategory = 'carry';
  }

  const openPopover = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  return (
    <>
      <Header />
      <div className="bg-white mt-6">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="border-b border-gray-200 pb-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{subcategory || 'All Products'}</h1>
            <p className="mt-4 text-base text-gray-500">
              Checkout out the latest release of Basic Tees, new and improved with four openings!
            </p>
          </div>

          <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <Filter category={filterCategory} />

            {/* Product grid */}
            <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product: Product) => (
                  <div key={product.name} className="group relative" onClick={() => openPopover(product)}>
                    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a href="#">
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Popover for Product Details */}
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
          />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <span aria-hidden="true" className="hidden md:inline-block md:h-screen md:align-middle">&#8203;</span>
              <DialogPanel
                transition
                className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
              >
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                  {selectedProduct && (
                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:items-center lg:gap-x-8">
                      <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        <img alt={selectedProduct.imageAlt} src={selectedProduct.imageSrc} className="object-cover object-center" />
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7">
                        <h2 className="text-xl font-medium text-gray-900 sm:pr-12">{selectedProduct.name}</h2>
                        <section aria-labelledby="information-heading" className="mt-1">
                          <h3 id="information-heading" className="sr-only">Product information</h3>
                          <p className="font-medium text-gray-900">{selectedProduct.price}</p>
                          <div className="mt-4">
                            <h4 className="sr-only">Reviews</h4>
                            <div className="flex items-center">
                              <p className="text-sm text-gray-700">4.5 <span className="sr-only"> out of 5 stars</span></p>
                            </div>
                          </div>
                        </section>
                        <section aria-labelledby="options-heading" className="mt-8">
                          <h3 id="options-heading" className="sr-only">Product options</h3>
                          <form>
                            <button
                              type="submit"
                              className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Add to bag
                            </button>
                            <p className="absolute left-4 top-4 text-center sm:static sm:mt-8">
                              <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                                View full details
                              </a>
                            </p>
                          </form>
                        </section>
                      </div>
                    </div>
                  )}
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
        <Footer />
      </div>
    </>
  );
};

export default ProductList;
