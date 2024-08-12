// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { UserProvider } from './context/UserContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Alte rute, cum ar fi Login sau Register, pot fi adăugate aici */}
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
