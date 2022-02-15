import React, { useContext } from 'react';
import { StyleContext } from './Product.jsx';

var Selectors = () => {
  const { allStyles, currentStyle, dispatch } = useContext(StyleContext);

  const renderStyles = () => {}

  const renderSizes = () => {}

  return (
    <div>Style and Size selctors</div>
  )
}

export default Selectors;