import React from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';

render(
  // <App />,
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Navigate to="/products/42368" />}></Route>
      <Route path='/products/:product_id' element={<App />}></Route>
      <Route path='/products/:product_id/:style_id' element={<App />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('app')
);

// axios.get('/api/products')
// .then(
//   ({ data }) => {
//     let ids = data.map(product => product.id);
//     return ids[Math.floor(Math.random()*ids.length)];
//   }
// )
// .then((id) => {
//   render(
//     // <App />,
//     <BrowserRouter>
//       <Routes>
//         <Route exact path="/" element={<Navigate to={`/products/${id}`} />}></Route>
//         {/* <Route exact path="/products" element={<Navigate to="/42368" />}></Route> */}
//         <Route path='/products/:product_id' element={<App />}></Route>
//         <Route path='/products/:product_id/:style_id' element={<App />}></Route>
//       </Routes>
//     </BrowserRouter>,
//     document.getElementById('app')
//   );
// })
// .catch((err) => console.error('Network error: ', err));