import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';

render(
  // <App />,
  <BrowserRouter>
    <Routes>
      <Route path='/products/:product_id' element={<App />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('app')
);
