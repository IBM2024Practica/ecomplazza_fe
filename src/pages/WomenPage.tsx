// src/pages/WomenPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import SubcategoryFilter from '../components/SubCategoryFilter';
import PriceFilter from '../components/PriceFilter';
import MaterialFilter from '../components/MaterialFilter';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext'; 

const WomenPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { user, setUser } = useUser();
  const [filters, setFilters] = useState({
    subcategories: [] as string[],
    minPrice: '' as number | '',
    maxPrice: '' as number | '',
    materials: [] as string[],
  });

  const fetchProducts = async () => {
    try {
      const params: any = { category: 'women' };

      if (filters.subcategories.length > 0) {
        params.subcategory = filters.subcategories.join(',');
      }
      if (filters.minPrice !== '') {
        params.minPrice = filters.minPrice;
      }
      if (filters.maxPrice !== '') {
        params.maxPrice = filters.maxPrice;
      }
      if (filters.materials.length > 0) {
        params.material = filters.materials.join(',');
      }

      const response = await axios.get('https://ecomplazza.serveftp.com/api/products/products', { params });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleSubcategoryChange = (selected: string[]) => {
    setFilters((prev) => ({ ...prev, subcategories: selected }));
  };

  const handlePriceChange = (minPrice: number, maxPrice: number) => {
    setFilters((prev) => ({ ...prev, minPrice, maxPrice }));
  };

  const handleMaterialChange = (selected: string[]) => {
    setFilters((prev) => ({ ...prev, materials: selected }));
  };

  return (
    <div>
      <Header cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          <aside className="w-1/4 pr-4">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <SubcategoryFilter onChange={handleSubcategoryChange} />
            <PriceFilter onChange={handlePriceChange} />
            <MaterialFilter onChange={handleMaterialChange} />
          </aside>
          <section className="w-3/4">
            <h2 className="text-2xl font-bold mb-4">Women's Products</h2>
            <ProductList products={products} addToCart={addToCart} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default WomenPage;
