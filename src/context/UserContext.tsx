// src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  role: 'customer' | 'distributor' | 'admin';
}

interface UserContextProps {
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifySession(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifySession = async (token: string) => {
    try {
      const response = await axios.get('https://ecomplazza.serveftp.com/api/users/verifySession', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error('Failed to verify session:', error);
      setLoading(false);
    }
  };

  const login = async (token: string) => {
    localStorage.setItem('token', token);
    await verifySession(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    axios.post('https://ecomplazza.serveftp.com/api/users/logout'); // Optional: Logout request to server
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
