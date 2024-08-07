// src/pages/KidsPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import SubcategoryFilter from '../components/SubCategoryFilter';
import PriceFilter from '../components/PriceFilter';
import MaterialFilter from '../components/MaterialFilter';
import { Product } from '../types';
import { useCart } from '../Contexts/CartContext';

const KidsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [filters, setFilters] = useState({
    subcategories: [] as string[],
    minPrice: '' as number | '',
    maxPrice: '' as number | '',
    materials: [] as string[],
  });

  const fetchProducts = async () => {
    const params: any = { category: 'kids', subcategory: filters.subcategories.join(','), minPrice: filters.minPrice, maxPrice: filters.maxPrice, material: filters.materials.join(',') };
    try {
      const response = await axios.get('http://localhost:5000/api/products/products', { params });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => { fetchProducts(); }, [filters]);

  const handleSubcategoryChange = (selected: string[]) => setFilters((prev) => ({ ...prev, subcategories: selected }));
  const handlePriceChange = (minPrice: number, maxPrice: number) => setFilters((prev) => ({ ...prev, minPrice, maxPrice }));
  const handleMaterialChange = (selected: string[]) => setFilters((prev) => ({ ...prev, materials: selected }));

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
            <h2 className="text-2xl font-bold mb-4">Kids' Products</h2>
            <ProductList products={products} addToCart={addToCart} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default KidsPage;
