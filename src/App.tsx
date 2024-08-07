// src/App.tsx
import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import KidsPage from './pages/KidsPage';
import MenPage from './pages/MenPage';
import WomenPage from './pages/WomenPage';
import AccessoriesPage from './pages/AccessoriesPage';
import CheckoutPage from './pages/CheckoutPage';
import DashboardPage from './pages/DashboardDistribuitor';
import { CartProvider } from './contexts/CartContext';
import AdminPanelPage from './pages/AdminPanelPage';
interface UserContextProps {
  user: { id: string; name: string; role: string } | null;
  setUser: (user: { id: string; name: string; role: string } | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; name: string; role: string } | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kids" element={<KidsPage />} />
            <Route path="/men" element={<MenPage />} />
            <Route path="/women" element={<WomenPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/admin-panel" element = {<AdminPanelPage/>} />
          </Routes>
        </Router>
      </UserProvider>
    </CartProvider>
  );
};

export default App;
