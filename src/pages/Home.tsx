import React from 'react';
import Header from '../components/Header';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">
          Welcome to Ecomplazza
        </h1>
        <p className="text-xl text-gray-600 mb-8 text-center max-w-3xl">
          Ecomplazza is your trusted online platform where you can discover a wide range of fascinating products. Whether you're looking for the latest fashion trends, unique accessories, or high-quality items for your everyday needs, we've got you covered.
        </p>
        <div className="mt-10">
          <a
            href="#explore"
            className="bg-indigo-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
          >
            Start Exploring
          </a>
        </div>
      </main>
      <section id="explore" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Explore Our Collections
        </h2>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          From the latest fashion styles to the trendiest accessories, Ecomplazza offers something for everyone. Start your shopping journey with us today!
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="/women"
            className="bg-green-500 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-green-600 transition-colors duration-300 ease-in-out"
          >
            Shop Women
          </a>
          <a
            href="/men"
            className="bg-blue-500 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 ease-in-out"
          >
            Shop Men
          </a>
          <a
            href="/kids"
            className="bg-pink-500 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-pink-600 transition-colors duration-300 ease-in-out"
          >
            Shop Kids
          </a>
        </div>
      </section>
      <footer className="bg-gray-800 py-6 mt-12">
        <div className="container mx-auto text-center text-white">
          <p>&copy; 2024 Ecomplazza. All rights reserved.</p>
          <p>Follow us on social media for the latest updates and promotions.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
