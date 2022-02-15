import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import Photos from './Photos.jsx';
import AllDetails from './AllDetails.jsx';

// useContext and useReducer to manage style state
export const StyleContext = React.createContext();

const styleReducer = (state, action) => {
  switch (action.type) {
    case 'switchCurrentStyle':
      return selectStyle(state.allStyles, action.payload.id);
    case 'newProduct':
      return {allStyles: action.payload.allStyles, currentStyle: action.payload.currentStyle};
    default:
      return state;
  }
}

function selectStyle(all, newId) {
  for (let style of all) {
    if (style.style_id === newId) {
      return { allStyle: all, currentStyle: style };
    }
  }
}

const Product = ({ productId, reviewMetaData }) => {
  const [state, dispatch] = useReducer(styleReducer, {allStyles: [], currentStyle: {}})

  function getStyles(product_id) {
    axios.get(`/api/products/${product_id}/styles`)
    .then(({ data }) => {
      dispatch({
        type: 'newProduct',
        payload: {allStyles: data.results, currentStyle: data.results[0]}
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