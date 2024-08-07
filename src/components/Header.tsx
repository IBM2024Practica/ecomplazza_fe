// src/components/Header.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import SlideOver from './SlideOver';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import Cart from './Cart';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../App';

interface HeaderProps {
  cartItems: Product[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (index: number) => void;
}

const categories = [    
  { name: 'Women', href: '/women' },
  { name: 'Men', href: '/men' },
  { name: 'Kids', href: '/kids' },
  { name: 'Accessories', href: '/accessories' },
];

const Header: React.FC<HeaderProps> = ({ cartItems, addToCart, removeFromCart }) => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, setUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/users/verifySession', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.user) {
            setUser(data.user);
          }
        })
        .catch(error => console.error('Eroare la verificarea sesiunii:', error));
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <header className="bg-white">
      <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 pb-14">
          <div className="flex h-16 items-center justify-between">
            <div className="flex flex-1">
              <Link to="/">
                <span className="sr-only">Your Company</span>
                <img
                  alt="Logo"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            <div className="flex h-14 space-x-8 overflow-x-auto border-t px-4 pb-px sm:h-full sm:justify-center sm:overflow-visible sm:border-t-0 sm:pb-0">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800"
                >
                  {category.name}
                </Link>
              ))}
              {user?.role === 'distributor' && (
                <Link
                  to="/dashboard"
                  className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800"
                >
                  Dashboard
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link
                  to="/admin-panel"
                  className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800"
                >
                  Admin Panel
                </Link>
              )}
            </div>

            <div className="flex flex-1 items-center justify-end">
              <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Search</span>
                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
              </a>
              {user ? (
                <>
                  <span className="ml-4 p-2 text-gray-700">
                    Hello, {user.name}
                  </span>
                  <button onClick={handleLogout} className="ml-4 p-2 text-gray-400 hover:text-gray-500">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsSignInOpen(true)} className="ml-4 p-2 text-gray-400 hover:text-gray-500">
                    Sign In
                  </button>
                  <button onClick={() => setIsSignUpOpen(true)} className="ml-4 p-2 text-gray-400 hover:text-gray-500">
                    Create Account
                  </button>
                </>
              )}
              <div className="ml-4 flow-root lg:ml-8">
                <button onClick={() => setIsCartOpen(true)} className="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {cartItems.length}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <SlideOver isOpen={isSignInOpen} setIsOpen={setIsSignInOpen} title="Sign In">
        <SignInForm setIsOpen={setIsSignInOpen} setUser={setUser} />
      </SlideOver>
      <SlideOver isOpen={isSignUpOpen} setIsOpen={setIsSignUpOpen} title="Create Account">
        <SignUpForm setIsOpen={setIsSignUpOpen} setUser={setUser} />
      </SlideOver>
      <SlideOver isOpen={isCartOpen} setIsOpen={setIsCartOpen} title="Shopping Cart">
        <Cart cartItems={cartItems} onClose={() => setIsCartOpen(false)} removeFromCart={removeFromCart} />
      </SlideOver>
    </header>
  );
};

export default Header;
