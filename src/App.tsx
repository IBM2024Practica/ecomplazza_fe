import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoreFront from './pages/StoreFront';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoreFront />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
