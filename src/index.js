import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import MainContents from './components/MainContents.js';
import Header from './components/Header';

const headerTag = ReactDOM.createRoot(document.getElementById('header'));
headerTag.render(
    <React.StrictMode>
        <Header />
    </React.StrictMode>
);

const contents = ReactDOM.createRoot(document.getElementById('contents'));
contents.render(
    <MainContents />
);