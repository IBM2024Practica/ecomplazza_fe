// src/components/SignUp.tsx
'use client';

import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useUser } from '../context/UserContext';
import axios from 'axios';

interface SignUpProps {
  onClose: () => void;
  open: boolean;
}

const SignUp: React.FC<SignUpProps> = ({ onClose, open }) => {
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('https://ecomplazza.serveftp.com/api/users/register', {
        username,
        email,
        password,
      });
      login(response.data.token); // Stochează token-ul și setează userul în context
      onClose(); // Închide slide-over-ul după înregistrare
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-black bg-opacity-50" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out translate-x-0 sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                      Sign Up
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={onClose}
                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <form onSubmit={handleSignUp}>
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button 
                      type="submit" 
                      className="w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 ease-in-out"
                    >
                      Sign Up
                    </button>
                  </form>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SignUp;
