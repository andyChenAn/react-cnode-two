import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/reset.css';
import configureStore from './store/index';
const store = configureStore();
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
