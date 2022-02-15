import React, { useState } from 'react';

var Photos = ({ photos }) => {
  const [currentPhoto, setCurrentPhoto] = useState(photos[0].thumbnail_url);
  const [expandedView, setExpandedView] = useState(false);

  const handlePhotoChange = (e) => {
    setCurrentPhoto(e.target.src);
  }

  const renderThumbnails = () => {
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
        {renderThumbnails()}
      </div>
    </div>
  )
}

export default Photos;