import React from 'react';
<<<<<<< HEAD
import axios from 'axios';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
=======
>>>>>>> 5aa82ec (working on react-router)
import App from './App.jsx';
import { render }  from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<<<<<<< HEAD
render(
  // <App />,
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Navigate to="/products/42370" />}></Route>
      <Route path='/products/:product_id' element={<App />}></Route>
      <Route path='/products/:product_id/:style_id' element={<App />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('app')
);
=======
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
>>>>>>> 5aa82ec (working on react-router)
