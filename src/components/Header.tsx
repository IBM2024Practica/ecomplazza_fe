import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CartSlideOver from './CartSlideOver';
import { useUser } from '../context/UserContext';
import { ShoppingCartIcon, HeartIcon, UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const { user, logout } = useUser();
  const [isCartOpen, setCartOpen] = useState(false);
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold text-gray-800">
          eComplazza
        </Link>
        <nav className="flex space-x-8 text-gray-700">
          <Link to="/women" className="hover:text-gray-900 transition duration-200">
            Women
          </Link>
          <Link to="/men" className="hover:text-gray-900 transition duration-200">
            Men
          </Link>
          <Link to="/kids" className="hover:text-gray-900 transition duration-200">
            Kids
          </Link>
          {user && user.role === 'distributor' && (
            <Link to="/dashboard" className="hover:text-gray-900 transition duration-200">
              Dashboard
            </Link>
          )}
          {user && user.role === 'admin' && (
            <Link to="/admin" className="hover:text-gray-900 transition duration-200">
              Admin Dashboard
            </Link>
          )}
        </nav>
        <div className="flex items-center space-x-4 text-gray-700">
          <Link to="/favorites" className="hover:text-gray-900 transition duration-200">
            <HeartIcon className="h-6 w-6" />
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="relative hover:text-gray-200 transition-colors duration-300 ease-in-out"
          >
            <ShoppingCartIcon className="h-6 w-6" />
          </button>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Hi, {user.username}</span>
              <button 
                onClick={logout} 
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition duration-200"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => setSignInOpen(true)} 
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition duration-200"
              >
                <UserIcon className="h-6 w-6" />
                <span>Log In</span>
              </button>
              <button 
                onClick={() => setSignUpOpen(true)} 
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition duration-200"
              >
                <span>Register</span>
              </button>
            </>
          )}
        </div>
      </div>

      <SignIn open={isSignInOpen} onClose={() => setSignInOpen(false)} />
      <SignUp open={isSignUpOpen} onClose={() => setSignUpOpen(false)} />
      <CartSlideOver isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}

export default Header;
