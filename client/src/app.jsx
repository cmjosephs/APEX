import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Product from './Overview/Product.jsx';
import ReviewList from './Reviews/ReviewList.jsx';
import RelatedList from './Related/RelatedList.jsx';
import QAList from './Questions/QAList.jsx';

const App = () => {
  const [productId, setProductId] = useState(42370); // hard coded, make dynamic later
  const [reviewMetaData, setReviewMetaData] = useState(
    {
      "product_id": "42370",
      "ratings": {
          "1": "1",
          "2": "1",
          "3": "7",
          "4": "1",
          "5": "2"
      },
      "recommended": {
          "false": "6",
          "true": "6"
      },
      "characteristics": {
          "Size": {
              "id": 142045,
              "value": "2.6363636363636364"
          },
          "Width": {
              "id": 142046,
              "value": "2.2727272727272727"
          },
          "Comfort": {
              "id": 142047,
              "value": "3.7272727272727273"
          },
          "Quality": {
              "id": 142048,
              "value": "3.2727272727272727"
          }
      }
  }
  );

  function getRandomProductId() {}

  return (
    <div>
      <nav><h1>FEC project</h1>------Navigation bar</nav>
      <br></br>
      <Product productId={productId} reviewMetaData={reviewMetaData} />
      <br></br>
      <RelatedList />
      <QAList />
      <ReviewList />
    </div>
  );
}

export default App;
