// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { startMirageIfNeeded } from './mirage/init';

startMirageIfNeeded();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
