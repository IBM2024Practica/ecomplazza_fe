import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import KidsPage from './pages/KidsPage';
import MenPage from './pages/MenPage';
import WomenPage from './pages/WomenPage';
import AccessoriesPage from './pages/AccessoriesPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kids" element={<KidsPage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
