import React, { useState, useEffect, useLayoutEffect, createContext, useReducer } from 'react';
import axios from 'axios';
import Product from './Overview/Product.jsx';
import ReviewList from './Reviews/ReviewList.jsx';
import RelatedList from './Related/RelatedList.jsx';
import QAList from './Questions/QAList.jsx';
import { useParams } from 'react-router-dom';

export const AppContext = createContext();

// const ACTIONS = {
//   ADDTOFAVORITE: 'add',
//   TOGGLEFAVORITE: 'toggle'
// }
// function reducer(state, action) {
//   switch (action.type)  {
//     case 'toggle':
//       return
//   }
// }

const App = () => {
  const { product_id } = useParams();
  //const [state, dispatch] = useReducer(reducer, { favoriteProducts: [] })
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
    setProductId(product_id);
  }, [product_id]);

  useEffect(() => {
    if (productId) {
      getProductDetails();
      getProductMetaData();
    }
  }, [productId]);

  if (!productId || !reviewMetaData || !productDetails) return <h2>Loading</h2>

  return (
    <AppContext.Provider
      value={{ productId, setProductId, reviewMetaData, productDetails }}
    >
      <div>
        <nav>
          <h1>FEC project</h1>
          <p>-------------Navigation Bar-------------</p>
        </nav>
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