import React, { useState, useEffect, useLayoutEffect, createContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Product from './Overview/Product.jsx';
import resizeWidth from './Overview/resizeWidth.jsx';
import ReviewList from './Reviews/ReviewList.jsx';
import RelatedList from './Related/RelatedList.jsx';
import QAList from './Questions/QAList.jsx';

import { testProduct, testStyles, testReviewMetaData } from '../../__tests__/OverviewTests/overviewTestData.js'

export const AppContext = createContext();

const App = () => {
  const { product_id } = useParams();
  const { width } = resizeWidth();
  const [productId, setProductId] = useState(product_id);
  const [productDetails, setProductDetails] = useState({});
  const [reviewMetaData, setReviewMetaData] = useState(null);

  function getRandomProductId() {
    axios.get('/api/products')
    .then(
      ({ data }) => {
        let ids = data.map(product => product.id);
        setProductId(ids[Math.floor(Math.random()*ids.length)]);
      }
    )
    .catch((err) => console.error('Network error: ', err));


    // setProductId(parseInt(testReviewMetaData.product_id));
    // setProductId(42370);
  }

  function getProductDetails() {
    axios.get(`/api/products/${productId}`)
    .then(({ data }) => setProductDetails(data))
    .catch(err => console.error(err));

    // setProductDetails(testProduct)
  }

  function getProductMetaData() {
    axios.get(`/api/products/${productId}/reviews/meta`)
    .then(({ data }) => setReviewMetaData(data))
    .catch((err) => console.error(err));

    // setReviewMetaData(testReviewMetaData);
  }

  // useEffect(getRandomProductId, []);
  useEffect(() => {
    // console.log(params.product_id);
    if (productId) {
      getProductDetails();
      getProductMetaData();
    }
  }, [productId]);

  if (!productId || !reviewMetaData || !productDetails.id) return <h2>Loading</h2>

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
        {/* <ul>
          <li>Men</li>
          <li>Women</li>
          <li>Kids</li>
        </ul> */}
        <h1>{width > 959 ? "AXIOS" : "A"}</h1>
        <div>
          <input type="text" placeholder="Search" className="nav-search"></input>
          <p>Favorites</p>
          <p>Bag</p>
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
