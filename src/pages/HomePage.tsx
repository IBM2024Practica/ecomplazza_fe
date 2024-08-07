// src/pages/HomePage.tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Product } from '../types';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header cartItems={[]} addToCart={function (product: Product, size: string, color: string): void {
        throw new Error('Function not implemented.');
      } } removeFromCart={function (index: number): void {
        throw new Error('Function not implemented.');
      } } />
      <main className="bg-white">
        <section className="relative bg-gray-800 text-white">
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              src="https://source.unsplash.com/random/1920x1080"
              alt="Hero"
            />
            <div className="absolute inset-0 bg-gray-900 opacity-50" />
          </div>
          <div className="relative container mx-auto px-6 py-32">
            <h1 className="text-4xl font-bold">Welcome to Our Store</h1>
            <p className="mt-4 text-lg">Discover the best products at unbeatable prices</p>
            <a href="#featured" className="mt-8 inline-block bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700">
              Shop Now
            </a>
          </div>
        </section>
        <section id="featured" className="container mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Replace with dynamic product items */}
            <div className="bg-white shadow-md rounded-md overflow-hidden">
              <img className="w-full h-48 object-cover" src="https://source.unsplash.com/random/400x400?product" alt="Product" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">Product Name</h3>
                <p className="text-gray-600">$99.99</p>
                <button className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Add to Cart</button>
              </div>
            </div>
            {/* Add more product items here */}
          </div>
        </section>
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-800">What Our Customers Say</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Replace with dynamic testimonials */}
              <div className="bg-white shadow-md rounded-md p-6">
                <p className="text-gray-600">"This store is amazing! The products are top-notch and the customer service is excellent."</p>
                <p className="mt-4 text-gray-800 font-semibold">- John Doe</p>
              </div>
              {/* Add more testimonials here */}
            </div>
          </div>
        </section>
        <section className="container mx-auto px-6 py-16">
          <div className="bg-indigo-600 text-white rounded-md p-8 text-center">
            <h2 className="text-2xl font-bold">Join Our Newsletter</h2>
            <p className="mt-4">Get the latest updates and offers.</p>
            <form className="mt-8 flex justify-center">
              <input
                type="email"
                className="w-full max-w-xs p-2 rounded-l-md focus:outline-none"
                placeholder="Enter your email"
              />
              <button className="bg-indigo-700 py-2 px-4 rounded-r-md hover:bg-indigo-800">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
