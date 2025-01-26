import React from 'react';
import ReactDOM from 'react-dom/client'; // Bu satırı değiştiriyoruz
import './index.css';
import App from './App';

// React 18'de render yerine createRoot kullanılır
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
