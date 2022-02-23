<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3dbdce4 (Favorite products list not rendering)
import React, { useState, useEffect, userReducer, createContext, useRef } from 'react';
import RelatedListCard from './RelatedListCard.jsx';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
<<<<<<< HEAD
import Rating from '@mui/material/Rating';
import FavoriteListCard from './FavoriteListCard.jsx'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FavoriteList = ({ currentProductId, currentProductDetails, currentProductRating, currentProductImg }) => {
  const [favorites, setFavorites] = useState([]);
  // const [count, setCount] = useState(0);

  useEffect(() => {
    gatherFavorites();
  }, [])

  // useEffect(() => {
  //   updateCount();
  // }, [])

  // function updateCount() {
  //   let newCount = 0;
  //   if (favorites.length !== 0) {
  //     lastIndex = favorites.length - 1;
  //     newCount = favorites[lastIndex].startIndex + 1;
  //   }
  //   setCount(newCount);
  // }

  function gatherFavorites() {
    const favoriteProductObjects = Object.values(localStorage);
    const favoriteProductsArray = [];
    // favoriteProductObjects.sort((a, b) => (a.startIndex > b.startIndex) ? 1 : -1);
    favoriteProductObjects.map((productObj) => {
      favoriteProductsArray.push(JSON.parse(productObj));
    })
    setFavorites(favoriteProductsArray);
    // setCount(prevCount => prevCount + 1);
=======
import React, { useState, useEffect, userReducer, createContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Rating from '@mui/material/Rating';
//import FavoriteListCard from './FavoriteListCard.jsx';
=======
// import React, { useState, useEffect, userReducer, createContext } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faX } from '@fortawesome/free-solid-svg-icons';
// import Rating from '@mui/material/Rating';
// //import FavoriteListCard from './FavoriteListCard.jsx';
>>>>>>> 5aa82ec (working on react-router)

// const FavoriteList = ({ currentProductId, currentProductDetails, currentProductRating, currentProductImg }) => {
//   const [favorites, setFavorites] = useState([]);

//   function gatherObjects() {
//     const favoriteProductObjects = Object.values(localStorage);
//     const favoriteProductsArray = favoriteProductObjects.map((productObj) => JSON.parse(productObj));
//     return favoriteProductsArray;
//   }

<<<<<<< HEAD
  function getFavorites() {
    const updateStorage = gatherObjects();
    setFavorites(updateStorage);
>>>>>>> f90c663 (Wrote localStorage functions. Move to App.jsx and refactor with)
=======
import FavoriteListCard from './FavoriteListCard.jsx'

const FavoriteList = ({ currentProductId, currentProductDetails, currentProductRating, currentProductImg }) => {
  const [favorites, setFavorites] = useState([]);

  function gatherFavorites() {
    // console.log(localStorage);
    const favoriteProductObjects = Object.values(localStorage);
    const favoriteProductsArray = [];
    favoriteProductObjects.map((productObj) => {
      favoriteProductsArray.push(JSON.parse(productObj));
    })
    // console.log(favoriteProductsArray)
    // console.log(favoriteProductsArray[0])
    // console.log(favoriteProductsArray[0].productName)
    // console.log(favoriteProductsArray[0].url)
    // console.log(favoriteProductsArray[0].category)
    // console.log(favoriteProductsArray[0].rating)
    setFavorites(favoriteProductsArray);
>>>>>>> 3dbdce4 (Favorite products list not rendering)
  }

  function addToFavorites() {
    const productToAdd = {
<<<<<<< HEAD
<<<<<<< HEAD
      // startIndex: count,
      productID: currentProductId,
      productName: currentProductDetails.name,
      category: currentProductDetails.category,
      url: currentProductImg.thumbnail_url,
      rating: currentProductRating,
      price: currentProductDetails.default_price
=======
      productName: currentProductDetails.name,
      category: currentProductDetails.category,
      url:  currentProductImg
      rating: currentProductRating
>>>>>>> f90c663 (Wrote localStorage functions. Move to App.jsx and refactor with)
=======
      productName: currentProductDetails.name,
      category: currentProductDetails.category,
      url: currentProductImg.thumbnail_url,
      rating: currentProductRating
>>>>>>> 3dbdce4 (Favorite products list not rendering)
    }

    localStorage.setItem(currentProductId, JSON.stringify(productToAdd));
    if (favorites.length !== localStorage.length) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3dbdce4 (Favorite products list not rendering)
      gatherFavorites();
    }
  }

<<<<<<< HEAD
  function delFavorites(favoriteProductId) {
    localStorage.removeItem(favoriteProductId);
    gatherFavorites();
  }

  const favoriteRef = React.useRef();

  const scrollProductsLeft = (scrollOffset) => {
    favoriteRef.current.scrollLeft -= 450;
  }

  const scrollProductsRight = (scrollOffset) => {
    favoriteRef.current.scrollLeft += 450;
=======
      getFavorites();
    }
  }

  function delFavorites() {
    localStorage.removeItem(currentProductId)
    const updateStorage = gatherObjects();
    setFavorites(updateStorage);
>>>>>>> f90c663 (Wrote localStorage functions. Move to App.jsx and refactor with)
  }

  function renderFavorites() {
    if (favorites.length !== 0) {
<<<<<<< HEAD
      return favorites.map((favorite, index) => {
        return (
          <>
            <FavoriteListCard
              favorite={favorite}
              delFavorites={delFavorites}
              key={`${favorite.productID}-${index}`}
            />
            {/* <FavoriteBorderIcon onClick={() => delFavorites(favorite.productID)}/> */}
            {/* <button onClick={() => delFavorites(favorite.productID)}>Remove from favorites -</button> */}
          </>
        )
      })
=======
  function delFavorites() {
    localStorage.removeItem(currentProductId)
    gatherFavorites();
  }

  useEffect(() => {
    gatherFavorites();
  }, [])

  const favoriteRef = React.useRef();

  const scrollProductsLeft = (scrollOffset) => {
    console.log(scrollOffset);
    favoriteRef.current.scrollLeft -= scrollOffset;
  }

  const scrollProductsRight = (scrollOffset) => {
    console.log(scrollOffset);
    favoriteRef.current.scrollLeft += scrollOffset;
  }

  function renderFavorites() {
    if(favorites.length !== 0) {
      console.log(favorites[0].productName)
      return (
        <>
          <div>Help Me</div>
          {favorites.map((favorite, index) => {
            <FavoriteListCard
              productName={favorite.productName}
              category={favorite.category}
              url={favorite.url}
              rating={favorite.rating}
            />
          })}
        </>
      )
>>>>>>> 3dbdce4 (Favorite products list not rendering)
    }
  }

  return (
    <div>
<<<<<<< HEAD
      <h3 className="favorite-title">Your Favorite Products</h3>
      <div className="favorite-wrapper">
        <div className="favorite-row">
          <div className="favorite-next">
            <ArrowForwardIosIcon fontSize="large" className="favorite-scroll-right" onClick={() => scrollProductsRight()} />
          </div>
          <div className="favorite-prev">
            <ArrowBackIosNewIcon fontSize="large" className="favorite-scroll-left" onClick={() => scrollProductsLeft()} />
          </div>
        </div>
        <div className="favorite-carousel" ref={favoriteRef}>
          <div className="favorite-card">
            <button onClick={() => addToFavorites(currentProductId)}>
              <div className="add-favorite-button">Add to Your Favorites</div>
              <FavoriteIcon />
            </button>
          </div>
          {/* <button onClick={() => delFavorites(currentProductId)}>Remove from favorites -</button> */}
          {renderFavorites()}
        </div>


=======
      <div className="favorite-wrapper">
        <h3 className="favorite-title">Your Favorite Products</h3>

        <div className="favorite-carousel" ref={favoriteRef}>
          <button onClick={addToFavorites}>Add to your favorites +</button>
          <button onClick={delFavorites}>Remove from favorites -</button>
          {renderFavorites()}
        </div>

        <div className="favorite-row">
          <div className="favorite-prev">
            <ArrowBackIosNewIcon fontSize="large" className="favorite-scroll-left" onClick={() => scrollProductsLeft(carouselScrollOffset)} />
          </div>
          <div className="favorite-next">
            <ArrowForwardIosIcon fontSize="large" className="favorite-scroll-right" onClick={() => scrollProductsRight(carouselScrollOffset)} />
          </div>
        </div>

>>>>>>> 3dbdce4 (Favorite products list not rendering)
        <br></br>
        <br></br>
      </div>
    </div>
<<<<<<< HEAD
=======

>>>>>>> 3dbdce4 (Favorite products list not rendering)
  )
}

export default FavoriteList;

// {"productName":"Morning Joggers","category":"Pants","url":"https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","rating":4}

<<<<<<< HEAD
// {"productName":"Heir Force Ones","category":"Kicks","url":"https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","rating":3.25}

            // console.log(favorite, index, '***all saved products***');
            //console.log(typeof favorite);
            // <FavoriteListCard
            //   // favorite={favorite}
            //   someProductName={favorite.productName}
            //   key={`${currentProductId}-${index}`}
            // />
            // console.log(favorite.productName);
            // <div className="hello-world">{favorite.productName}</div>
=======
      return (
        {favorites.map((favorite, index) => (
          <FavoriteListCard favorite={favorite} key={`${currentProductId}-${index}`}/>
        ))}
      )
    } else {
      return (
=======
//   function getFavorites() {
//     const updateStorage = gatherObjects();
//     setFavorites(updateStorage);
//   }

//   function addToFavorites() {
//     const productToAdd = {
//       productName: currentProductDetails.name,
//       category: currentProductDetails.category,
//       url:  currentProductImg
//       rating: currentProductRating
//     }

//     localStorage.setItem(currentProductId, JSON.stringify(productToAdd));
//     if (favorites.length !== localStorage.length) {
//       getFavorites();
//     }
//   }

//   function delFavorites() {
//     localStorage.removeItem(currentProductId)
//     const updateStorage = gatherObjects();
//     setFavorites(updateStorage);
//   }

//   function renderFavorites() {
//     if (favorites.length !== 0) {
//       return (
//         {favorites.map((favorite, index) => (
//           <FavoriteListCard favorite={favorite} key={`${currentProductId}-${index}`}/>
//         ))}
//       )
//     } else {
//       return (
>>>>>>> 5aa82ec (working on react-router)

//       )
//     }
//   }
//   // useEffect(() => {

//   // }, [favorites])

//   return (
//     <div>
//       <button style={{ display: "flex", width: "300px", height: "375px" }} onClick={addToFavorites}>Add to Favorites +</button>
//       {favorites.map((favorite, index) => (

//         <FavoriteListCard favorite={favorite} key={`${currentProductId}-${index}`}/>
//       ))}

//       {relatedArr.map((relatedId, index) => (
//           <div style={{ display: "flex", margin: "5px" }}>
//             <RelatedListCard
//               relatedId={relatedId}
//               currentProductId={currentProductId}
//               key={`${index}-${relatedId}`}
//               currentProductDetails={productDetails}
//               currentProductImg={currentProductImg}/>
//           </div>
//         ))}
//     </div>

//   )
// }

<<<<<<< HEAD
export default FavoriteList;
>>>>>>> f90c663 (Wrote localStorage functions. Move to App.jsx and refactor with)
=======
// export default FavoriteList;
>>>>>>> 5aa82ec (working on react-router)
=======
// {"productName":"Heir Force Ones","category":"Kicks","url":"https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","rating":3.25}
>>>>>>> 3dbdce4 (Favorite products list not rendering)
