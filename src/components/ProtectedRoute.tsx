import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface ProtectedRouteProps {
  element: React.ComponentType<any>;
  roles: string[]; // Roluri permise, de exemplu ['distributor']
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Component, roles }) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    // Dacă nu este autentificat, redirecționează la pagina principală
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (roles.length && !roles.includes(user.role)) {
    // Dacă rolul utilizatorului nu este permis, redirecționează la pagina principală
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Dacă utilizatorul este autentificat și are rolul permis, afișează componenta
  return <Component />;
};

export default ProtectedRoute;
