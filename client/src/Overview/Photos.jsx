import React, { useState, useEffect, useContext } from 'react';
import { StyleContext } from './Product.jsx';
import resizeWidth from './resizeWidth.jsx';
import { Modal } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowKeysReact from 'arrow-keys-react';

var Photos = () => {
  const { currentStyle } = useContext(StyleContext);
  const { width } = resizeWidth();
  const [photos, setPhotos] = useState(currentStyle.photos);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal(!openModal);
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
      data-testid="scroll-right"
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
            <img src={
              photo.url ? photo.url : 'https://netmechanics.ca/wp-content/uploads/2019/04/you-almost-got-me-almost.jpg'
            } key={index} alt={`${index}`}
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
          src={
            photos[currentPhotoIdx].url ?
            photos[currentPhotoIdx].url :
            "https://netmechanics.ca/wp-content/uploads/2019/04/you-almost-got-me-almost.jpg"
          }
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
              <img src={photos[currentPhotoIdx].url} alt={currentStyle.name} className="expanded-display-photo" data-testid={`modal-photo-${currentPhotoIdx}`}></img>
              {rightArrow("expanded-scroller-arrow expanded-view-right-arrow")}
              <button onClick={toggleModal} className="expanded-view-exit-btn">X</button>
            </div>
            <div className="expanded-photos-scroller">
              {renderThumbnails()}
            </div>
          </div>
        </Modal>
      </div>
    )
  }

  if (!Object.keys(currentStyle).length || !photos.length) return <p>Loading...</p>
  return (
    <div className="image-gallery">
      {renderModal()}
      {width > 959 ? renderWideView() : renderNarrowView()}
    </div>
  )
}

export default Photos;