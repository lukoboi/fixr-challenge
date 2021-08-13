import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { NotificationContextProvider } from './context/NotificationContext';

ReactDOM.render(
  <React.StrictMode>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
