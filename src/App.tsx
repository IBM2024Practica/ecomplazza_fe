// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Women from './pages/Women';
import Men from './pages/Men';
import Kids from './pages/Kids';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import CheckoutPage from './pages/CheckoutPage';
const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/women" element={<Women />} />
          <Route path="/men" element={<Men />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/dashboard" element={<ProtectedRoute element={DashboardPage} roles={['distributor']} />} />
          <Route path="/checkout" element={<ProtectedRoute element={CheckoutPage}  roles={['customer', 'distributor', 'admin'] } />}/>
          
          {/* Alte rute pot fi adăugate aici */}
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
