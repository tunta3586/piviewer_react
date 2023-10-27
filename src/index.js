import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import Header from './components/Header'

const root = ReactDOM.createRoot(document.getElementById('channerBar'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const headerTag = ReactDOM.createRoot(document.getElementById('header'));
headerTag.render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>
);