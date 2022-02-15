import React, { useState, useContext } from 'react';
import { StyleContext } from './Product.jsx';

var Photos = () => {
  const { currentStyle } = useContext(StyleContext);
  const [currentPhoto, setCurrentPhoto] = useState(currentStyle.photos[0].thumbnail_url);
  const [expandedView, setExpandedView] = useState(false);

  const handlePhotoChange = (e) => {
    setCurrentPhoto(e.target.src);
  }

  const renderThumbnails = (photos) => {
    return photos.map((photo, index) => {
      return <img src={photo.thumbnail_url} key={index} alt="n/a" className="thumbnail-image"
        onClick={(e) => handlePhotoChange(e)}></img>
    })
  }

  return (
    <div className="image-gallery">
      <div className="display-photo">
        <img src={currentPhoto} alt="no image"></img>
      </div>
      <div id="thumbnail-images">
        {renderThumbnails(currentStyle.photos)}
      </div>
    </div>
  )
}

export default Photos;