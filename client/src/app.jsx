import React, { useState, useEffect, useLayoutEffect, createContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Product from './Overview/Product.jsx';
import resizeWidth from './Overview/resizeWidth.jsx';
import ReviewList from './Reviews/ReviewList.jsx';
import RelatedList from './Related/RelatedList.jsx';
import QAList from './Questions/QAList.jsx';
// import 'bag.svg' from '../dist/images/bag.svg';

export const AppContext = createContext();

const App = () => {
  const { product_id } = useParams();
  const { width } = resizeWidth();
  const [productId, setProductId] = useState(product_id);
  const [productDetails, setProductDetails] = useState({});
  const [reviewMetaData, setReviewMetaData] = useState(null);

  // function getRandomProductId() {
  //   axios.get('/api/products')
  //   .then(
  //     ({ data }) => {
  //       let ids = data.map(product => product.id);
  //       setProductId(ids[Math.floor(Math.random()*ids.length)]);
  //     }
  //   )
  //   .catch((err) => console.error('Network error: ', err));
  // }

  function getProductDetails() {
    axios.get(`/api/products/${productId}`)
    .then(({ data }) => setProductDetails(data))
    .catch(err => console.error(err));
  }

  function getProductMetaData() {
    axios.get(`/api/products/${productId}/reviews/meta`)
    .then(({ data }) => setReviewMetaData(data))
    .catch((err) => console.error(err));
  }

  useEffect(() => {
      getProductDetails();
      getProductMetaData();
  }, [productId]);

  if (!reviewMetaData || !productDetails.id) return <h2>Loading</h2>

  return (
    <AppContext.Provider
      value={{ productId, setProductId, reviewMetaData, productDetails }}
    >
      <nav>
        {width > 959 ?
        <ul>
          <li>Men</li>
          <li>Women</li>
          <li>Kids</li>
        </ul> : <ul>lll</ul>}
        <h1>{width > 959 ? "APEX" : "A"}</h1>
        <div>
          <input type="text" placeholder="Search" className="nav-search"></input>
          <img src="/images/heart.svg" alt="favorites" ></img>
          <img src="/images/bag.svg" alt="shopping-bag" ></img>
        </div>
      </nav>
      <hr id="nav-break"/>
      <div>
        <br></br>
        <Product />
        <br></br>
        <RelatedList />
        <QAList />
        <ReviewList />
      </div>
    </AppContext.Provider>

  );
}

export default App;
