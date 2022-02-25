import React from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import ScrollToTop from './Shared/ScrollToTop.jsx';

render(
  // <App />,
  <BrowserRouter>
    <ScrollToTop>
      <Routes>
        <Route exact path="/" element={<Navigate to="/products/42370" />}></Route>
        <Route path='/products/:product_id' element={<App />}></Route>
        <Route path='/products/:product_id/:style_id' element={<App />}></Route>
      </Routes>
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById('app')
);
