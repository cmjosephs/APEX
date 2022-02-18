import React, { useState, useContext, useEffect, useReducer } from 'react';
import { ProductContext } from './ReviewList.jsx';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, InputLabel, MenuItem, Select, Rating, Radio, Typography, RadioGroup, FormControl, FormControlLabel, FormLabel, IconButton, Stack }
from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';



const ReviewForm = () => {

  let currentProduct = useContext(ProductContext);
  let [open, setOpen] = useState(false);
  let [recommended, setRecommended] = useState(true);
  let [rating, setRating] = useState(0);
  let [userName, setUserName] = useState(null);
  let [userEmail, setUserEmail] = useState(null);
  let [reviewSummary, setReviewSummary] = useState(null);
  let [reviewBody, setReviewBody] = useState(null);
  let [characteristics, setCharacteristics] = useState({});
  let [upload, setUpload] = useState(true);
  let [uploadedPics, setUploadedPics] = useState([]);
  let [picURLs, setPicURLs] = useState([]);
  let [state, dispatch] = useReducer(characteristicsReducer, {});


  function characteristicsReducer(state, action) {
    switch (action.type) {
      case "addCharacteristic":
        // return {...state, [characteristics[action.payload.name].id]: action.payload.value};
        let char = (Object.keys(action.payload));
        let charValue = (Object.values(action.payload))
        return {...state, [characteristics[char[0]].id]: charValue[0]};
        break;
      default:
        return state;
    }
  }

  useEffect(() => {
    getMetaData()
}, [])


  // get review metadata for this product
  // put its characteristics into an object
  const getMetaData = () => {
    axios.get(`/api/products/${currentProduct.product}/reviews/meta`)
    .then(results => {
      // setCharacteristics(Object.keys(results.data.characteristics))
      // console.log(results.data.characteristics)
      setCharacteristics(results.data.characteristics)
      // dispatch({ type: newCharacteristics, payload: results.data.characteristics })
    }).catch(err => {
      console.log('error getting metadata')
    })
  }

 // on submit, update characteristics
 // send axios request

 const renderCharacteristics = () => {
   let productCharacteristics = Object.keys(characteristics);
   return (
     <div>
       {productCharacteristics.includes('Fit') &&
       <FormControl sx={{ display: 'inline-flex', my: 1 }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Fit</FormLabel>
            <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="Fit"
            onChange={(e) => {dispatch({ type: "addCharacteristic", payload: { [e.target.name]: e.target.value }})}}
           >
             <FormControlLabel value="1" control={<Radio />} label="Runs tight" />
             <FormControlLabel value="2" control={<Radio />} label="Slightly tight" />
             <FormControlLabel value="3" control={<Radio />} label="Perfect" />
             <FormControlLabel value="4" control={<Radio />} label="Slightly loose" />
             <FormControlLabel value="5" control={<Radio />} label="Runs loose" />
           </RadioGroup>
       </FormControl>}

       {productCharacteristics.includes('Comfort') &&
       <FormControl sx={{ display: 'inline-flex', my: 1 }}>
          <FormLabel id="demo-row-radio-buttons-group-label">Comfort</FormLabel>
          <RadioGroup
           aria-labelledby="demo-row-radio-buttons-group-label"
           name="Comfort"
           onChange={(e) => {dispatch({ type: "addCharacteristic", payload: { [e.target.name]: e.target.value }})}}
         >
           <FormControlLabel value="1" control={<Radio />} label="Uncomfortable" />
           <FormControlLabel value="2" control={<Radio />} label="Slightly uncomfortable" />
           <FormControlLabel value="3" control={<Radio />} label="Ok" />
           <FormControlLabel value="4" control={<Radio />} label="Comfortable" />
           <FormControlLabel value="5" control={<Radio />} label="Perfect" />
         </RadioGroup>
         </FormControl>}

      {productCharacteristics.includes('Size') &&
        <FormControl sx={{ display: 'inline-flex', my: 1 }}>
          <FormLabel id="demo-row-radio-buttons-group-label">Size</FormLabel>
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="Size"
            onChange={(e) => {dispatch({ type: "addCharacteristic", payload: { [e.target.name]: e.target.value }})}}
            >
            <FormControlLabel value="1" control={<Radio />} label="Too small" />
            <FormControlLabel value="2" control={<Radio />} label="1/2 size too small" />
            <FormControlLabel value="3" control={<Radio />} label="Perfect" />
            <FormControlLabel value="4" control={<Radio />} label="1/2 size too big" />
            <FormControlLabel value="5" control={<Radio />} label="Too big" />
          </RadioGroup>
        </FormControl>
      }

      {productCharacteristics.includes('Width') &&
      <FormControl sx={{ display: 'inline-flex', my: 1 }}>
          <FormLabel id="demo-row-radio-buttons-group-label">Width</FormLabel>
          <RadioGroup
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="Width"
          onChange={(e) => {dispatch({ type: "addCharacteristic", payload: { [e.target.name]: e.target.value }})}}
        >
          <FormControlLabel value="1" control={<Radio />} label="Too narrow" />
          <FormControlLabel value="2" control={<Radio />} label="Slightly narrow" />
          <FormControlLabel value="3" control={<Radio />} label="Perfect" />
          <FormControlLabel value="4" control={<Radio />} label="Slightly wide" />
          <FormControlLabel value="5" control={<Radio />} label="Too wide" />
        </RadioGroup>
        </FormControl>
      }

      {productCharacteristics.includes('Quality') &&
        <FormControl sx={{ display: 'inline-flex', my: 1 }}>
          <FormLabel id="demo-row-radio-buttons-group-label">Quality</FormLabel>
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="Quality"
            onChange={(e) => {dispatch({ type: "addCharacteristic", payload: { [e.target.name]: e.target.value }})}}
          >
            <FormControlLabel value="1" control={<Radio />} label="Poor" />
            <FormControlLabel value="2" control={<Radio />} label="Below average" />
            <FormControlLabel value="3" control={<Radio />} label="What I expected" />
            <FormControlLabel value="4" control={<Radio />} label="Pretty great" />
            <FormControlLabel value="5" control={<Radio />} label="Perfect" />
          </RadioGroup>
        </FormControl>
      }

      {productCharacteristics.includes('Length') &&
        <FormControl sx={{ display: 'inline-flex', my: 1 }}>
          <FormLabel id="demo-row-radio-buttons-group-label">Length</FormLabel>
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="Length"
            onChange={(e) => {dispatch({ type: "addCharacteristic", payload: { [e.target.name]: e.target.value }})}}
          >
            <FormControlLabel value="1" control={<Radio />} label="Runs short" />
            <FormControlLabel value="2" control={<Radio />} label="Below average" />
            <FormControlLabel value="3" control={<Radio />} label="Perfect" />
            <FormControlLabel value="4" control={<Radio />} label="Slightly long" />
            <FormControlLabel value="5" control={<Radio />} label="Runs long" />
          </RadioGroup>
        </FormControl>
      }


     </div>

   )
 }


  useEffect(() => {
    maxUpload();
  }, [uploadedPics]);


  const Input = styled('input')({
    display: 'none',
  });

  const maxUpload = () => {
    if (uploadedPics.length === 5) {
      setUpload(false)
    }
  }

  const handlePhotoUpload = (e) => {
    setUploadedPics([...uploadedPics, e.target.files[0]])
    let newURL = URL.createObjectURL(e.target.files[0]);
    setPicURLs([...picURLs, newURL]);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setRecommended(event.target.value);
  };

  const handleUserInput = (event) => {
    switch (event.target.name) {
      case "name":
        setUserName(event.target.value);
        break;
      case "email":
        setUserEmail(event.target.value);
        break;
      case "body":
        setReviewBody(event.target.value);
        break;
      case "summary":
        setReviewSummary(event.target.value);
        break;
    }
  }

  // const handleReviewSubmit = () => {
  //   axios.post(`/products/${currentProduct}/reviews`, {
  //     product_id: `${currentProduct}`,
  //     rating,
  //     summary: '',
  //     body: reviewBody,
  //     recommend: recommended,
  //     name: userName,
  //     email: userEmail,
  //     photos: picURLs,
  //     characteristics
  //   })
  // }

  if (!Object.keys(characteristics).length) {
    return <p>Loading...</p>
  }

  return (
    // <div><button onClick={getMetaData}>hi</button></div>
    <div className="review-form">
      <Button variant="outlined" onClick={handleClickOpen}>
        Write A Review
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='xl'
        sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
      }} >

        <DialogTitle>Write A Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please share your experience.
          </DialogContentText>

          <FormControl sx={{ display: 'block', my: 1}}>
          <Typography sx={{display: 'block', my: 1 }}>
            Overall rating*
              </Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newRating) => {
                  setRating(newRating);
                }}
              />
              <Typography sx={{display: 'inline', ml: 1 }}>
                {rating === 1 && 'Poor'}
                {rating === 2 && 'Fair'}
                {rating === 3 && 'Average'}
                {rating === 4 && 'Good'}
                {rating === 5 && 'Great'}
              </Typography>

          </FormControl>

          <FormControl sx={{ display: 'block', my: 1}}>
            <InputLabel id="demo-simple-select-label">Do you recommend this product?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={recommended}
              label="Do you recommend this product?"
              onChange={handleChange}
              sx={{ display: 'block'}}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
                {renderCharacteristics()}

          <FormControl sx={{display: 'block', my: 1}} onChange={handleUserInput}>
          <TextField
            required
            id="nickname"
            name="name"
            label="Nickname"
            variant="outlined"
            sx={{display: 'inline-flex',
              pr: 1}}
            inputProps={{ maxLength: 60 }}
          />
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            sx={{display: 'inline-flex'}}
            inputProps={{ maxLength: 60 }}
          />

          </FormControl>

          <TextField
            id="review-summary"
            name="summary"
            label="Review summary here"
            autoFocus
            margin="dense"
            fullWidth
            variant="outlined"
            onChange={handleUserInput}
            inputProps={{ maxLength: 60 }}
          />

          <TextField
            required
            multiline
            id="review-body"
            name="body"
            label="Write your review here"
            autoFocus
            margin="dense"
            fullWidth
            variant="outlined"
            onChange={handleUserInput}
            inputProps={{ minLength: 50, maxLength: 1000 }}
          />


            <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="contained-button-file">

            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handlePhotoUpload} />

            {upload && <Button variant="contained" component="span">
              Upload photos
            </Button>}


            {uploadedPics.map((pic, idx) => {
              return <img id="uploaded-review-thumbnail" src={pic? URL.createObjectURL(pic) : null} alt={pic? pic.name : null} width="200" height="250" key={`review-uploads-${idx}`}/>
            })}

          </label>
          </Stack>

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );


}

// const ReviewForm = () => {

//   let currentProduct = useContext(ProductContext);
//   let [open, setOpen] = useState(false);
//   let [recommended, setRecommended] = useState(true);
//   let [rating, setRating] = useState(0);
//   let [userName, setUserName] = useState(null);
//   let [userEmail, setUserEmail] = useState(null);
//   let [reviewSummary, setReviewSummary] = useState(null);
//   let [reviewBody, setReviewBody] = useState(null);

//   let [size, setSize] = useState(null);
//   let [width, setWidth] = useState(null);
//   let [comfort, setComfort] = useState(null);
//   let [quality, setQuality] = useState(null);
//   let [length, setLength] = useState(null);
//   let [fit, setFit] = useState(null);
//   let [upload, setUpload] = useState(true);
//   let [uploadedPics, setUploadedPics] = useState([]);
//   let [picURLs, setPicURLs] = useState([]);

//   // let characteristics = {
//   //   size,
//   //   width,
//   //   comfort,
//   //   quality,
//   //   length,
//   //   fit
//   // };


//   useEffect(() => {
//     maxUpload();
//   }, [uploadedPics]);


//   const Input = styled('input')({
//     display: 'none',
//   });

//   const maxUpload = () => {
//     if (uploadedPics.length === 5) {
//       setUpload(false)
//     }
//   }

//   const handlePhotoUpload = (e) => {
//     setUploadedPics([...uploadedPics, e.target.files[0]])
//     let newURL = URL.createObjectURL(e.target.files[0]);
//     setPicURLs([...picURLs, newURL]);
//   }


//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleChange = (event) => {
//     setRecommended(event.target.value);
//   };

//   const handleCharacteristics = (event) => {
//     switch (event.target.name) {
//       case "size":
//         setSize(event.target.value)
//         break;
//       case "width":
//         setWidth(event.target.value);
//         break;
//       case "comfort":
//         setComfort(event.target.value);
//         break;
//       case "quality":
//         setQuality(event.target.value);
//         break;
//       case "length":
//         setLength(event.target.value);
//         break;
//       case "fit":
//         setFit(event.target.value);
//         break;
//     }
//   }

//   const handleUserInput = (event) => {
//     switch (event.target.name) {
//       case "name":
//         setUserName(event.target.value);
//         break;
//       case "email":
//         setUserEmail(event.target.value);
//         break;
//       case "body":
//         setReviewBody(event.target.value);
//         break;
//       case "summary":
//         setReviewSummary(event.target.value);
//         break;
//     }
//   }

//   const handleReviewSubmit = () => {
//     axios.post(`/products/${currentProduct}/reviews`, {
//       product_id: `${currentProduct}`,
//       rating,
//       summary: '',
//       body: reviewBody,
//       recommend: recommended,
//       name: userName,
//       email: userEmail,
//       photos: picURLs,
//       characteristics: {

//       }
//     })
//   }

//   return (
//     <div className="review-form">
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Write A Review
//       </Button>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         fullWidth
//         maxWidth='xl'
//         sx={{
//         display: 'flex',
//         flexDirection: { xs: 'column', md: 'row' },
//         alignItems: 'center',
//       }} >

//         <DialogTitle>Write A Review</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Please share your experience.
//           </DialogContentText>

//           <FormControl sx={{ display: 'block', my: 1}}>
//           <Typography sx={{display: 'block', my: 1 }}>
//             Overall rating*
//               </Typography>
//               <Rating
//                 name="simple-controlled"
//                 value={rating}
//                 onChange={(event, newRating) => {
//                   setRating(newRating);
//                 }}
//               />
//               <Typography sx={{display: 'inline', ml: 1 }}>
//                 {rating === 1 && 'Poor'}
//                 {rating === 2 && 'Fair'}
//                 {rating === 3 && 'Average'}
//                 {rating === 4 && 'Good'}
//                 {rating === 5 && 'Great'}
//               </Typography>

//           </FormControl>

//           <FormControl sx={{ display: 'block', my: 1}}>
//             <InputLabel id="demo-simple-select-label">Do you recommend this product?</InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={recommended}
//               label="Do you recommend this product?"
//               onChange={handleChange}
//               sx={{ display: 'block'}}
//             >
//               <MenuItem value={true}>Yes</MenuItem>
//               <MenuItem value={false}>No</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl sx={{ display: 'inline-flex', my: 1 }}>
//             <FormLabel id="demo-row-radio-buttons-group-label">Size</FormLabel>
//             <RadioGroup
//               aria-labelledby="demo-row-radio-buttons-group-label"
//               name="size"
//               onChange={handleCharacteristics}
                //  onChange={(e) => {dispatch({ type: "addCharacteristic", payload: { e.target.name: e.target.value }})}}
//               >
//               <FormControlLabel value="1" control={<Radio />} label="Too small" />
//               <FormControlLabel value="2" control={<Radio />} label="1/2 size too small" />
//               <FormControlLabel value="3" control={<Radio />} label="Perfect" />
//               <FormControlLabel value="4" control={<Radio />} label="1/2 size too big" />
//               <FormControlLabel value="5" control={<Radio />} label="Too big" />
//             </RadioGroup>
//           </FormControl>

//           <FormControl sx={{ display: 'inline-flex', my: 1 }}>
//             <FormLabel id="demo-row-radio-buttons-group-label">Width</FormLabel>
//             <RadioGroup
//               aria-labelledby="demo-row-radio-buttons-group-label"
//               name="width"
//               onChange={handleCharacteristics}
//             >
//               <FormControlLabel value="1" control={<Radio />} label="Too narrow" />
//               <FormControlLabel value="2" control={<Radio />} label="Slightly narrow" />
//               <FormControlLabel value="3" control={<Radio />} label="Perfect" />
//               <FormControlLabel value="4" control={<Radio />} label="Slightly wide" />
//               <FormControlLabel value="5" control={<Radio />} label="Too wide" />
//             </RadioGroup>
//           </FormControl>

//           <FormControl sx={{ display: 'inline-flex', my: 1 }}>
//             <FormLabel id="demo-row-radio-buttons-group-label">Comfort</FormLabel>
//             <RadioGroup
//               aria-labelledby="demo-row-radio-buttons-group-label"
//               name="comfort"
//               onChange={handleCharacteristics}
//             >
//               <FormControlLabel value="1" control={<Radio />} label="Uncomfortable" />
//               <FormControlLabel value="2" control={<Radio />} label="Slightly uncomfortable" />
//               <FormControlLabel value="3" control={<Radio />} label="Ok" />
//               <FormControlLabel value="4" control={<Radio />} label="Comfortable" />
//               <FormControlLabel value="5" control={<Radio />} label="Perfect" />
//             </RadioGroup>
//           </FormControl>

//           <FormControl sx={{ display: 'inline-flex', my: 1 }}>
//             <FormLabel id="demo-row-radio-buttons-group-label">Quality</FormLabel>
//             <RadioGroup
//               aria-labelledby="demo-row-radio-buttons-group-label"
//               name="quality"
//               onChange={handleCharacteristics}
//             >
//               <FormControlLabel value="1" control={<Radio />} label="Poor" />
//               <FormControlLabel value="2" control={<Radio />} label="Below average" />
//               <FormControlLabel value="3" control={<Radio />} label="What I expected" />
//               <FormControlLabel value="4" control={<Radio />} label="Pretty great" />
//               <FormControlLabel value="5" control={<Radio />} label="Perfect" />
//             </RadioGroup>
//           </FormControl>

//           <FormControl sx={{ display: 'inline-flex', my: 1 }}>
//             <FormLabel id="demo-row-radio-buttons-group-label">Length</FormLabel>
//             <RadioGroup
//               aria-labelledby="demo-row-radio-buttons-group-label"
//               name="length"
//               onChange={handleCharacteristics}
//             >
//               <FormControlLabel value="1" control={<Radio />} label="Runs short" />
//               <FormControlLabel value="2" control={<Radio />} label="Below average" />
//               <FormControlLabel value="3" control={<Radio />} label="Perfect" />
//               <FormControlLabel value="4" control={<Radio />} label="Slightly long" />
//               <FormControlLabel value="5" control={<Radio />} label="Runs long" />
//             </RadioGroup>
//           </FormControl>

//           <FormControl sx={{ display: 'inline-flex', my: 1 }}>
//             <FormLabel id="demo-row-radio-buttons-group-label">Fit</FormLabel>
//             <RadioGroup
//               aria-labelledby="demo-row-radio-buttons-group-label"
//               name="fit"
//               onChange={handleCharacteristics}
//             >
//               <FormControlLabel value="1" control={<Radio />} label="Runs tight" />
//               <FormControlLabel value="2" control={<Radio />} label="Slightly tight" />
//               <FormControlLabel value="3" control={<Radio />} label="Perfect" />
//               <FormControlLabel value="4" control={<Radio />} label="Slightly loose" />
//               <FormControlLabel value="5" control={<Radio />} label="Runs loose" />
//             </RadioGroup>
//           </FormControl>

//           <FormControl sx={{display: 'block', my: 1}} onChange={handleUserInput}>
//           <TextField
//             required
//             id="nickname"
//             name="name"
//             label="Nickname"
//             variant="outlined"
//             sx={{display: 'inline-flex',
//               pr: 1}}
//             inputProps={{ maxLength: 60 }}
//           />
//           <TextField
//             required
//             id="email"
//             name="email"
//             label="Email"
//             variant="outlined"
//             sx={{display: 'inline-flex'}}
//             inputProps={{ maxLength: 60 }}
//           />

//           </FormControl>

//           <TextField
//             id="review-summary"
//             name="summary"
//             label="Review summary here"
//             autoFocus
//             margin="dense"
//             fullWidth
//             variant="outlined"
//             onChange={handleUserInput}
//             inputProps={{ maxLength: 60 }}
//           />

//           <TextField
//             required
//             multiline
//             id="review-body"
//             name="body"
//             label="Write your review here"
//             autoFocus
//             margin="dense"
//             fullWidth
//             variant="outlined"
//             onChange={handleUserInput}
//             inputProps={{ minLength: 50, maxLength: 1000 }}
//           />


//             <Stack direction="row" alignItems="center" spacing={2}>
//             <label htmlFor="contained-button-file">

//             <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handlePhotoUpload} />

//             {upload && <Button variant="contained" component="span">
//               Upload photos
//             </Button>}


//             {uploadedPics.map((pic, idx) => {
//               return <img id="uploaded-review-thumbnail" src={pic? URL.createObjectURL(pic) : null} alt={pic? pic.name : null} width="200" height="250" key={`review-uploads-${idx}`}/>
//             })}


//             {/* {upload && uploadedPics.map(pic => {
//               return <img id="uploaded-review-thumbnail" src={pic? () => {createPhotoURL(pic)} : null} alt={pic? pic.name : null}/>
//             })} */}
//           </label>
//           </Stack>

//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleClose}>Submit</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );


// }


export default ReviewForm;

// // TODO: if i click the X button or submit , change reviewForm state to false (close form)