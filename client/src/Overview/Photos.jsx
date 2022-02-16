import React, { useState, useEffect, useContext } from 'react';
import { StyleContext } from './Product.jsx';

var Photos = () => {
  const { currentStyle } = useContext(StyleContext);
  const [photos, setPhotos] = useState(currentStyle.photos);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [expandedView, setExpandedView] = useState(false);

  const handlePhotoChange = (i) => {
    setCurrentPhotoIdx(i);
  }

  const toggleExpandedView = () => {}

  useEffect(() => {
    setPhotos(currentStyle.photos);
    setCurrentPhotoIdx(0); // resets photo on style change, can omit if want to stay on index
  }, [currentStyle])

  const renderThumbnails = (photos) => {
    return photos.map((photo, index) => {
      return <img src={photo.thumbnail_url} key={index} alt={`${index}`} className="image-gallery-thumbnail"
        onClick={(e) => handlePhotoChange(e.target.alt)}></img>
    })
  }

  return (
    <div className="image-gallery">
      <div className="display-photo">
        <img src={photos[currentPhotoIdx].thumbnail_url} alt="main-image"></img>
      </div>
      <div id="thumbnail-images">
        {renderThumbnails(photos)}
      </div>
    </div>
  )
}

export default Photos;