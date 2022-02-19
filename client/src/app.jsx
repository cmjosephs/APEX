<<<<<<< HEAD
import React, { useState, useEffect, createContext } from 'react';
import { useParams } from 'react-router-dom';
=======
import React, { useState, useEffect, useLayoutEffect, createContext, useReducer } from 'react';
>>>>>>> 5aa82ec (working on react-router)
import axios from 'axios';
import NavBar from './NavBar.jsx';
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
<<<<<<< HEAD
  const [productDetails, setProductDetails] = useState(null);
  const [reviewMetaData, setReviewMetaData] = useState(null);

=======
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

>>>>>>> 5aa82ec (working on react-router)
  function getProductDetails() {
    axios.get(`/api/products/${product_id}`)
    .then(({ data }) => setProductDetails(data))
    .catch(err => console.error(err));
  }

  function getProductMetaData() {
    axios.get(`/api/products/${product_id}/reviews/meta`)
    .then(({ data }) => setReviewMetaData(data))
    .catch((err) => console.error(err));
  }

<<<<<<< HEAD
=======
  // useEffect(getRandomProductId, []);
<<<<<<< HEAD
  // useEffect(() => {
  //   setProductId(product_id);
  // }, [product_id]);
>>>>>>> 5aa82ec (working on react-router)
=======
  useEffect(() => {
    setProductId(product_id);
  }, [product_id]);

>>>>>>> eb6b606 (Completed basic features model)
  useEffect(() => {
<<<<<<< HEAD
      getProductDetails();
      getProductMetaData();
  }, [product_id]);

  if (!reviewMetaData || !productDetails) return <h2>Loading</h2>
=======
    if (productId) {
      getProductDetails();
      getProductMetaData();
    }
  }, [productId]);

<<<<<<< HEAD
  if (!productId|| !reviewMetaData || !productDetails) return <h2>Loading</h2>
>>>>>>> f90c663 (Wrote localStorage functions. Move to App.jsx and refactor with)
=======
  if (!productId || !reviewMetaData || !productDetails) return <h2>Loading</h2>
>>>>>>> 5aa82ec (working on react-router)

  return (
    <AppContext.Provider
      value={{ productId: product_id, reviewMetaData, productDetails }}
    >
      <NavBar />
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