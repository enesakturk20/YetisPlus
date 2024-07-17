import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18'de `react-dom/client` kullanılmalıdır
import App from './App';

// ReactDOM.createRoot ile kök elemanı oluşturun
const root = ReactDOM.createRoot(document.getElementById('root'));

// Kök eleman üzerine render edin
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
