import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { routes } from './routes/routes';
import { RouterProvider } from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={routes}/>
  </Provider>
);
