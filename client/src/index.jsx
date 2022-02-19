import React from 'react';
import App from './App.jsx';
import { render }  from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ReactDOM.render(<App />, document.getElementById('app'));
render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='/products/:product_id' element={<App />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('app')
)
