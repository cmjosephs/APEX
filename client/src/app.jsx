import React, { useState, useEffect, useLayoutEffect, createContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Product from './Overview/Product.jsx';
import ReviewList from './Reviews/ReviewList.jsx';
import RelatedList from './Related/RelatedList.jsx';
import QAList from './Questions/QAList.jsx';
// adding dark mode
import styled, { ThemeProvider } from 'styled-components';
import { lightMode, darkMode, GlobalStyles } from './Themes.js';

export const AppContext = createContext();
// adding dark mode
const StyledApp = styled.div``;

const App = () => {
  const [productId, setProductId] = useState(42366);
  const [productDetails, setProductDetails] = useState({});
  const [reviewMetaData, setReviewMetaData] = useState(null);
  // adding dark mode
  const [theme, setTheme] = useState('light');

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  function getRandomProductId() {
    // axios.get('/api/products')
    // .then(
    //   ({ data }) => {
    //     let ids = data.map(product => product.id);
    //     setProductId(ids[Math.floor(Math.random()*ids.length)]);
    //   }
    // )
    // .catch((err) => console.error('Network error: ', err));

    // setProductId(parseInt(testReviewMetaData.product_id));
    setProductId(42366);
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

  useEffect(getRandomProductId, []);
  useEffect(() => {
    if (productId) {
      getProductDetails();
      getProductMetaData();
    }
  }, [productId]);


  if (!productId || !reviewMetaData || !productDetails.id) return <h2>Loading</h2>
  // if (!productId) return <h2>Loading</h2>

  return (
    <ThemeProvider theme={theme === 'light' ? lightMode : darkMode}>
      <GlobalStyles/>
    <AppContext.Provider
      value={{ productId, setProductId, reviewMetaData, productDetails }}
    >
      <StyledApp>
      <div>
        <nav>
          <h1>FEC project</h1>
          <p>-------------Navigation Bar-------------</p>
        </nav>
        <br></br>

        <button onClick={() => themeToggler()}>Change Theme</button>
        <Product />
        <br></br>
        <RelatedList />
        <QAList />
        <ReviewList />
      </div>
      </StyledApp>
    </AppContext.Provider>
    </ThemeProvider>

  );
}

export default App;