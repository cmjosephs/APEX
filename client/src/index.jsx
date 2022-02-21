import React from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import axios from 'axios';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
=======
>>>>>>> 5aa82ec (working on react-router)
=======
import axios from 'axios';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
>>>>>>> fff3303 (Completed rendering carousel for related products)
import App from './App.jsx';

<<<<<<< HEAD
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
=======
>>>>>>> fff3303 (Completed rendering carousel for related products)
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
<<<<<<< HEAD
)
>>>>>>> 5aa82ec (working on react-router)
=======
);
>>>>>>> fff3303 (Completed rendering carousel for related products)
