import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';

render(
  // <App />,
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Navigate to="/products/42368"/>}></Route>
      <Route exact path="/products" element={<Navigate to="/products/42368"/>}></Route>
      <Route path='/products/:product_id' element={<App />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('app')
);
