import React, { useState, useEffect, createContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar.jsx';
import Product from './Overview/Product.jsx';
import ReviewList from './Reviews/ReviewList.jsx';
import RelatedList from './Related/RelatedList.jsx';
import QAList from './Questions/QAList.jsx';
import styled, { ThemeProvider } from 'styled-components';
import { lightMode, darkMode, GlobalStyles } from './Shared/Themes.js';

export const AppContext = createContext();

const StyledApp = styled.div``;

const App = () => {
  const { product_id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [reviewMetaData, setReviewMetaData] = useState(null);

  const [theme, setTheme] = useState('light');

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

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

  useEffect(() => {
    getProductDetails();
    getProductMetaData();
  }, [product_id]);

  if (!reviewMetaData || !productDetails) return <h2>Loading</h2>

  return (
    <ThemeProvider theme={theme === 'light' ? lightMode : darkMode}>
      <GlobalStyles />
      <AppContext.Provider
        value={{ productId: product_id, reviewMetaData, productDetails }}
      >
        <StyledApp>
          <NavBar themeToggler={themeToggler}/>
          <hr id="nav-break" />
          <div>
            <br></br>
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
