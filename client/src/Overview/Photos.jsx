import React, { useState, useEffect, useContext } from 'react';
import { StyleContext } from './Product.jsx';
import { Modal } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowKeysReact from 'arrow-keys-react';

var Photos = () => {
  const { currentStyle } = useContext(StyleContext);
  // const [width, setWidth] = useState(window.innerWidth);
  const [photos, setPhotos] = useState(currentStyle.photos);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal(!openModal);
  const wideViewModal = (i) => {
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
      // console.log(i);
      setCurrentPhotoIdx(i)
      // if (cb) cb();
    }
  }
  ArrowKeysReact.config({
    left: photoScroll.left,
    right: photoScroll.right
  })

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
        onClick={(e) => photoScroll.click(parseInt(e.target.alt))}></img>
    })
  }
{/* <img src={photo.url} key={index} alt={`${index}`}
              className="full-image-wide-view"
              onClick={(e) => photoScroll.click(parseInt(e.target.alt), cb);}
            ></img> */}

  const renderWideView = () => {
    return (
      <div className="images-gallery-wide-view">

        {photos.map((photo, index) => {
          return (
            <img
              src={photo.url}
              key={index}
              alt={`${index}`}
              className="full-image-wide-view"
              onClick={(e) => wideViewModal(index)}
              >
            </img>
          )
        })}


      </div>
    );
  }

  const renderNarrowView = () => {
    return (
      <div className="images-gallery-narrow-view">
        <ArrowBackIosNewIcon
          fontSize="large"
          className="left-arrow-narrow-view"
          color={currentPhotoIdx ? "primary" : "disabled"}
          onClick={photoScroll.left}
        />
        <img
          src={photos[currentPhotoIdx].url}
          className="image-narrow-view-main"
          alt={currentStyle.name}
          onClick={toggleModal}
        ></img>
        <ArrowForwardIosIcon
          fontSize="large"
          className="right-arrow-narrow-view"
          color={currentPhotoIdx === photos.length - 1 ? "disabled" : "primary"}
          onClick={photoScroll.right}
        />
      </div>
    )
  }


  const renderModal = () => {
    return (
      <div className="expanded-view" {...ArrowKeysReact.events} tabIndex="1">
        <Modal
          open={openModal}
          onClose={toggleModal}
          aria-labelledby="expanded-photo"
          aria-describedby="description"
          className="img-gallery-modal"
        >
          <div className="expanded-view-window">
            <div className="expanded-main-photo-section">
            <button  style={{ visibility: "hidden" }} className="expanded-view-exit-btn">X</button>
              <ArrowBackIosNewIcon
                fontSize="large"
                className="expanded-scroller-arrow expanded-view-left-arrow"
                color={currentPhotoIdx ? "primary" : "disabled"}
                onClick={photoScroll.left}
              />
              <img src={photos[currentPhotoIdx].url} alt={currentStyle.name} className="expanded-display-photo"></img>
              <ArrowForwardIosIcon
                fontSize="large"
                className="expanded-scroller-arrow expanded-view-right-arrow"
                color={currentPhotoIdx === photos.length - 1 ? "disabled" : "primary"}
                onClick={photoScroll.right}
              />
              <button onClick={toggleModal} className="expanded-view-exit-btn">X</button>
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
      {renderModal()}
      {window.innerWidth > 959 ? renderWideView() : renderNarrowView()}
    </div>
  )
  // console.log(window.innerWidth);

//   return (
//     <div className="image-gallery">
//       <div className="display-photo" {...ArrowKeysReact.events} tabIndex="1">
//         <ArrowBackIosNewIcon
//           fontSize="large"
//           color={currentPhotoIdx ? "primary" : "disabled"}
//           onClick={photoScroll.left}
//         />
//         <img src={photos[currentPhotoIdx].thumbnail_url} alt={currentStyle.name}  onClick={toggleModal}></img>
//         <ArrowForwardIosIcon
//           fontSize="large"
//           color={currentPhotoIdx === photos.length - 1 ? "disabled" : "primary"}
//           onClick={photoScroll.right}
//         />
//       </div>
//       {renderModal()}
//       <div id="default-photos">
//         {renderThumbnails(photos)}
//       </div>
//     </div>
//   )
}

export default Photos;