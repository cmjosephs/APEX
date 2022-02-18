import React, { useState, useEffect, useContext } from 'react';
import { StyleContext } from './Product.jsx';
import { Modal } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import Box from '@mui/material/Box';

var Photos = () => {
  const { currentStyle } = useContext(StyleContext);
  // const [width, setWidth] = useState(window.innerWidth);
  const [photos, setPhotos] = useState(currentStyle.photos);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal(!openModal);


  const handlePhotoChange = (i) => {
    setCurrentPhotoIdx(i);
  }

  const photoScrollRight = () => {
    if (currentPhotoIdx < photos.length - 1) setCurrentPhotoIdx(currentPhotoIdx + 1);
  }
  const photoScrollLeft = () => {
    if (currentPhotoIdx > 0) setCurrentPhotoIdx(currentPhotoIdx - 1);
  }

  // for window resize
  // useEffect(() => {
  //   setWidth(window.innerWidth);
  // }, [])

  useEffect(() => {
    setPhotos(currentStyle.photos);
    setCurrentPhotoIdx(0); // resets photo on style change, can omit if want to stay on index
  }, [currentStyle])

  const renderThumbnails = (photos) => {
    return photos.map((photo, index) => {
      return <img src={photo.thumbnail_url} key={index} alt={`${index}`} className="image-gallery-thumbnail"
        onClick={(e) => handlePhotoChange(parseInt(e.target.alt))}></img>
    })
  }

  const renderModal = () => {
    return (
      <div className="expanded-view">
        <Modal
          open={openModal}
          onClose={toggleModal}
          aria-labelledby="expanded-photo"
          aria-describedby="description"
          className="img-gallery-modal"
        >
          <div className="expanded-view-window">
            <div className="expanded-main-photo-section">
              <ArrowBackIosNewIcon
                fontSize="large"
                className="expanded-scroller-arrow"
                color={currentPhotoIdx ? "primary" : "disabled"}
                onClick={photoScrollLeft}
              />
              <img src={photos[currentPhotoIdx].url} alt={currentStyle.name} className="expanded-display-photo"></img>
              <ArrowForwardIosIcon
                fontSize="large"
                className="expanded-scroller-arrow"
                color={currentPhotoIdx === photos.length - 1 ? "disabled" : "primary"}
                onClick={photoScrollRight}
              />
              {/* <button onClick={toggleModal} className="expanded-view-exit-btn">X</button> */}
            </div>
            <div className="expanded-photos-scroller">
              {renderThumbnails(photos)}
            </div>

          </div>
        </Modal>
      </div>
    )
  }

  if (!Object.keys(currentStyle).length || !photos.length) return <p>Loading...</p>

  return (
    <div className="image-gallery">
      <div className="display-photo">
        <ArrowBackIosNewIcon
          fontSize="large"
          color={currentPhotoIdx ? "primary" : "disabled"}
          onClick={photoScrollLeft}
        />
        <img src={photos[currentPhotoIdx].thumbnail_url} alt={currentStyle.name}  onClick={toggleModal}></img>
        <ArrowForwardIosIcon
        fontSize="large"
        color={currentPhotoIdx === photos.length - 1 ? "disabled" : "primary"}
        onClick={photoScrollRight}
      />
      </div>
      {renderModal()}
      <div id="default-photos">
        {renderThumbnails(photos)}
      </div>
    </div>
  )
}

export default Photos;