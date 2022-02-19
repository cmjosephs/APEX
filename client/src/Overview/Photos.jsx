import React, { useState, useEffect, useContext } from 'react';
import { StyleContext } from './Product.jsx';
<<<<<<< HEAD
import resizeWidth from './resizeWidth.jsx';
import { Modal } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowKeysReact from 'arrow-keys-react';

var Photos = () => {
  const { currentStyle } = useContext(StyleContext);
  const { width } = resizeWidth();
=======
import { Modal, Box } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import Box from '@mui/material/Box';

var Photos = () => {
  const { currentStyle } = useContext(StyleContext);
  // const [width, setWidth] = useState(window.innerWidth);
>>>>>>> eb6b606 (Completed basic features model)
  const [photos, setPhotos] = useState(currentStyle.photos);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal(!openModal);
<<<<<<< HEAD
  const wideViewToModal = (i) => {
    photoScroll.click(i);
    toggleModal();
  }

  // image gallery navigation functions
  const photoScroll = {
    right: () => {
      if (currentPhotoIdx < photos.length - 1) setCurrentPhotoIdx(currentPhotoIdx + 1);
    },
    left: () => {
    if (currentPhotoIdx > 0) setCurrentPhotoIdx(currentPhotoIdx - 1);
    },
    click: (i) => {
      setCurrentPhotoIdx(i)
    }
  }
  ArrowKeysReact.config({
    left: photoScroll.left,
    right: photoScroll.right
  })

  useEffect(() => {
    setPhotos(currentStyle.photos);
    setCurrentPhotoIdx(0);
  }, [currentStyle])

  const leftArrow = (className) => (
    <ArrowBackIosNewIcon
      fontSize="large"
      className={className}
      color={currentPhotoIdx ? "primary" : "disabled"}
      onClick={photoScroll.left}
    />
  )
  const rightArrow = (className) => (
    <ArrowForwardIosIcon
      fontSize="large"
      className={className}
      color={currentPhotoIdx === photos.length - 1 ? "disabled" : "primary"}
      onClick={photoScroll.right}
    />
  )

  const renderThumbnails = () => {
    return photos.map((photo, index) => {
      return <img src={photo.thumbnail_url} key={index} alt={`${index}`}
        className="expanded-view-thumbnail"
        onClick={() => photoScroll.click(index)}></img>
    })
  }

  const renderWideView = () => {
    return (
      <div className="images-gallery-wide-view">
        {photos.map((photo, index) => {
          return (
            <img src={photo.url} key={index} alt={`${index}`}
              className="full-image-wide-view"
              onClick={() => wideViewToModal(index)}
            ></img>
          )
        })}
      </div>
    );
  }

  const renderNarrowView = () => {
    return (
      <div className="images-gallery-narrow-view" {...ArrowKeysReact.events} tabIndex="1">
        {leftArrow("left-arrow-narrow-view")}
        <img
          src={photos[currentPhotoIdx].url}
          className="image-narrow-view-main"
          alt={currentStyle.name}
          onClick={toggleModal}
        ></img>
        {rightArrow("right-arrow-narrow-view")}
      </div>
    )
  }

  const renderModal = () => {
    return (
      <div className="expanded-view" {...ArrowKeysReact.events} tabIndex="1">
        <Modal
          open={openModal}
          onClose={toggleModal}
          className="img-gallery-modal"
        >
          <div className="expanded-view-window">
            <div className="expanded-main-photo-section">
              <button
                style={{ visibility: "hidden" }}
                className="expanded-view-exit-btn"
              >X</button>
              {leftArrow("expanded-scroller-arrow expanded-view-left-arrow")}
              <img src={photos[currentPhotoIdx].url} alt={currentStyle.name} className="expanded-display-photo"></img>
              {rightArrow("expanded-scroller-arrow expanded-view-right-arrow")}
              <button onClick={toggleModal} className="expanded-view-exit-btn">X</button>
            </div>
            <div className="expanded-photos-scroller">
              {renderThumbnails()}
            </div>
          </div>
=======


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
        onClick={(e) => handlePhotoChange(e.target.alt)}></img>
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
        >
          <Box>
            <img src={photos[currentPhotoIdx].url} alt={currentStyle.name} className="expanded-display-photo"></img>
            <button onClick={toggleModal} className="expanded-view-exit-btn">X</button>
            <div className="expanded-photos-scroller">
              <ArrowBackIosNewIcon fontSize="large" onClick={photoScrollLeft} />
              {renderThumbnails(photos)}
              <ArrowForwardIosIcon fontSize="large" onClick={photoScrollRight} />
            </div>
          </Box>
>>>>>>> eb6b606 (Completed basic features model)
        </Modal>
      </div>
    )
  }

<<<<<<< HEAD
  if (!Object.keys(currentStyle).length || !photos.length) return <p>Loading...</p>
  return (
    <div className="image-gallery">
      {renderModal()}
      {width > 959 ? renderWideView() : renderNarrowView()}
=======
  return (
    <div className="image-gallery">
      <div className="display-photo">
        <ArrowBackIosNewIcon fontSize="large" onClick={photoScrollLeft} />
        <img src={photos[currentPhotoIdx].thumbnail_url} alt={currentStyle.name}  onClick={toggleModal}></img>
        <ArrowForwardIosIcon fontSize="large" onClick={photoScrollRight} />
      </div>
      {renderModal()}
      <div id="default-photos">
        {renderThumbnails(photos)}
      </div>
>>>>>>> eb6b606 (Completed basic features model)
    </div>
  )
}

export default Photos;