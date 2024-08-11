import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './contexts/UserContext'; // Asigură-te că importi UserProvider

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider> {/* UserProvider trebuie să fie la un nivel superior */}
      <App />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
