import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import Header from './components/Header'

const headerTag = ReactDOM.createRoot(document.getElementById('header'));
headerTag.render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>
);

const contents = ReactDOM.createRoot(document.getElementById('contents'));
contents.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);