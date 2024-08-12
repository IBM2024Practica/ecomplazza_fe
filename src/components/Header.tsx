// src/components/Header.tsx
import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useUser } from '../context/UserContext';

const Header: React.FC = () => {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const { user, logout } = useUser();

  return (
    <header className="bg-gradient-to-r from-blue-500 to-green-500 shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex space-x-8 text-white">
          <a href="#" className="text-lg font-bold hover:text-gray-200 transition-colors duration-300 ease-in-out">Women</a>
          <a href="#" className="text-lg font-bold hover:text-gray-200 transition-colors duration-300 ease-in-out">Men</a>
          <a href="#" className="text-lg font-bold hover:text-gray-200 transition-colors duration-300 ease-in-out">Kids</a>
          {user && user.role === 'distributor' && (
            <a href="/dashboard" className="text-lg font-bold hover:text-gray-200 transition-colors duration-300 ease-in-out">Dashboard</a>
          )}
          {user && user.role === 'admin' && (
            <a href="/admin" className="text-lg font-bold hover:text-gray-200 transition-colors duration-300 ease-in-out">Admin Panel</a>
          )}
        </div>
        <div className="space-x-4 text-white">
          {user ? (
            <>
              <span className="text-sm font-semibold">Welcome, {user.username}</span>
              <button 
                onClick={logout} 
                className="text-sm font-semibold hover:text-gray-200 transition-colors duration-300 ease-in-out"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setSignInOpen(true)} 
                className="text-sm font-semibold hover:text-gray-200 transition-colors duration-300 ease-in-out"
              >
                Log In
              </button>
              <button 
                onClick={() => setSignUpOpen(true)} 
                className="text-sm font-semibold hover:text-gray-200 transition-colors duration-300 ease-in-out"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      <SignIn open={isSignInOpen} onClose={() => setSignInOpen(false)} />
      <SignUp open={isSignUpOpen} onClose={() => setSignUpOpen(false)} />
    </header>
  );
}

export default Header;
