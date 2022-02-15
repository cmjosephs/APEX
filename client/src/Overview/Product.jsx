import React, { useState, useEffect, useReducer, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../App.jsx';
import Photos from './Photos.jsx';
import AllDetails from './AllDetails.jsx';

// useContext and useReducer to manage style state
export const StyleContext = React.createContext();

const styleReducer = (state, action) => {
  switch (action.type) {
    case 'switchCurrentStyle':
      return {...state, currentStyle: state.allStyles[action.payload.id]}
    case 'newProduct':
      return {allStyles: action.payload.allStyles, currentStyle: action.payload.currentStyle};
    default:
      return state;
  }
}

const Product = ({ reviewMetaData }) => {
  const [state, dispatch] = useReducer(styleReducer, {allStyles: {}, currentStyle: {}});
  const { productId } = useContext(AppContext);

  function getStyles(product_id) {
    axios.get(`/api/products/${product_id}/styles`)
    .then(({ data }) => {
      let styleObj = {};
      data.results.forEach((style) => {
        styleObj[style.style_id] = style;
      });
      dispatch({
        type: 'newProduct',
        payload: {allStyles: styleObj, currentStyle: data.results[0]}
      })
    })
    .catch((err) => console.error(err));
  }

  useEffect(() => {
    getStyles(productId);
  }, [productId]);

  if (!state.currentStyle || !Object.keys(state.currentStyle).length) {
    return <h3>Loading...</h3>
  } else {
    return (
      <StyleContext.Provider
        value={{ allStyles: state.allStyles, currentStyle: state.currentStyle, dispatch }}
      >

      <div id="product-overview">
        <Photos/>
        <AllDetails
          reviewMetaData={reviewMetaData}
          productId={productId}
        />
      </div>

      </StyleContext.Provider>
    )
  }

}

export default Product;