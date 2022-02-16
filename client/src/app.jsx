import React, { useState, useEffect, createContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Product from './Overview/Product.jsx';
import ReviewList from './Reviews/ReviewList.jsx';
import RelatedList from './Related/RelatedList.jsx';
import QAList from './Questions/QAList.jsx';

import { testReviewMetaData } from '../../__tests__/OverviewTests/overviewTestData.js'

export const AppContext = createContext();

const App = () => {
  const [productId, setProductId] = useState(null);
  const [reviewMetaData, setReviewMetaData] = useState(null);

  function getRandomProductId() {
    // setProductId(parseInt(testReviewMetaData.product_id));
    setProductId(42366);
  } // edit later

  function retrieveProductMetaData() {

    setReviewMetaData(testReviewMetaData);
  } // edit later

  useEffect(getRandomProductId, []);
  useEffect(retrieveProductMetaData, [productId]);

  if (!productId) return <h2>Loading</h2>

  return (
    <AppContext.Provider
      value={{ productId, setProductId, reviewMetaData, setReviewMetaData }}
    >
      <div>
        <nav><h1>FEC project</h1>------Navigation bar</nav>
        <br></br>
        <Product
          reviewMetaData={reviewMetaData} />
        <br></br>
        <RelatedList />
        <QAList />
        <ReviewList />
      </div>
    </AppContext.Provider>

  );
}

export default App;
