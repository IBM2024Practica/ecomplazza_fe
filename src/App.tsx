import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import KidsPage from './pages/KidsPage';
import MenPage from './pages/MenPage';
import WomenPage from './pages/WomenPage';
import AccessoriesPage from './pages/AccessoriesPage';
import CheckoutPage from './pages/CheckoutPage';
import DashboardPage from './pages/DashboardDistribuitor';
import { CartProvider } from './contexts/CartContext';
import { FavouritesProvider } from './contexts/FavouritesContext';
import AdminPanelPage from './pages/AdminPanelPage';
import FavouritesPage from './pages/FavouritesPage';
import { UserProvider } from './contexts/UserContext'; // Importă UserProvider

const App: React.FC = () => {
  return (
    <UserProvider> {/* Mută UserProvider aici */}
      <FavouritesProvider> 
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/kids" element={<KidsPage />} />
              <Route path="/men" element={<MenPage />} />
              <Route path="/women" element={<WomenPage />} />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/admin-panel" element={<AdminPanelPage />} />
              <Route path="/favourites" element={<FavouritesPage />} />
            </Routes>
          </Router>
        </CartProvider>
      </FavouritesProvider>
    </UserProvider>
  );
};

export default App;
