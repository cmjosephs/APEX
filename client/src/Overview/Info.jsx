import React, { useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { pink } from '@mui/material/colors';

var Info = ({ productDetails }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);


  const renderFeatures = (featList) => {
    if (showFeatures) {
      return (
        <div className="product-features">
          <h3 onClick={() => setShowFeatures(!showFeatures)}>Features -</h3>
            {featList.map((feature, index) => {
              return (
                <div className="feature" key={`feat-${index}`} >
                  {feature.feature}: {feature.value}
                </div>
              )
            })}
        </div>
      )
    } else {
      return (
        <div className="product-features"  onClick={() => setShowFeatures(!showFeatures)}>
          <h3>Features +</h3>
        </div>
      )
    }
  }

  const renderDetails = () => {
    if (showDetails) {
      return (
        <div className="product-details">
          <h3 onClick={() => setShowDetails(!showDetails)}>
            Details -
          </h3>
            <p className="product-slogan" role="product-slogan">{productDetails.slogan}</p>
            <p className="product-description" role="product-description">{productDetails.description}</p>
        </div>
      )
    } else {
      return (
        <div className="product-details" onClick={() => setShowDetails(!showDetails)}>
          <h3>Details +</h3>
        </div>
      )
    }
  }

  return (
    <div className="info">
      <hr></hr>
      {renderDetails()}
      {renderFeatures(productDetails.features)}
      <div className="share-bar">
        <h3>Share</h3>
        <div className="share-icons">
          <FacebookIcon className="share-icon" color="primary" />
          <InstagramIcon className="share-icon" color="secondary" />
          <TwitterIcon className="share-icon" color="primary" />
          <PinterestIcon className="share-icon" sx={{ color: "#b71c1c" }} />
        </div>
      </div>
    </div>
  )
}

export default Info;