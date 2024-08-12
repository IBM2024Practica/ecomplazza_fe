import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import SubcategoryFilter from '../components/SubcategoryFilter';
import PriceFilter from '../components/PriceFilter';
import MaterialFilter from '../components/MaterialFilter';
import BrandFilter from '../components/BrandFilter';
import { Product } from '../types';

const KidsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    subcategories: [] as string[],
    minPrice: '' as number | '',
    maxPrice: '' as number | '',
    materials: [] as string[],
    brands: [] as string[],
  });

  const fetchProducts = async () => {
    try {
      const params: any = { category: 'kids' };

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
      if (filters.brands.length > 0) {
        params.brand = filters.brands.join(',');
      }

      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`https://ecomplazza.serveftp.com/api/products/products?${queryString}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          <aside className="w-1/4 pr-4">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <SubcategoryFilter onChange={(selected) => setFilters((prev) => ({ ...prev, subcategories: selected }))} />
            <PriceFilter onChange={(min, max) => setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }))} />
            <MaterialFilter onChange={(selected) => setFilters((prev) => ({ ...prev, materials: selected }))} />
            <BrandFilter onChange={(selected) => setFilters((prev) => ({ ...prev, brands: selected }))} />
          </aside>
          <section className="w-3/4">
            <h2 className="text-2xl font-bold mb-4">Women's Products</h2>
            <ProductList products={products} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default KidsPage;
