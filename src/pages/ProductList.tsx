import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Filter from '../components/Filter';
import { getProductsByCategory } from '../api/api';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
type Product = {
  name: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
};

const ProductList = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <>
    <Header/>

    <div className="bg-white mt-6">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="border-b border-gray-200 pb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">{subcategory}</h1>
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
                <div key={product.name} className="group relative">
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>

    </>

  );
};

export default ProductList;
