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
      <main>
       
      </main>
      <Footer/>
    </div>
  );
};

export default HomePage;
