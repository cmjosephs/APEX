import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from './ReviewList.jsx';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, InputLabel, MenuItem, Select, Rating, Radio, Typography, RadioGroup, FormControl, FormControlLabel, FormLabel, IconButton, Stack }
from '@mui/material';
import { styled } from '@mui/material/styles';


const ReviewForm = () => {

  let currentProduct = useContext(ProductContext);
  let [open, setOpen] = useState(false);
  let [recommended, setRecommended] = useState(true);
  let [rating, setRating] = useState(0);

  let [size, setSize] = useState(null);
  let [width, setWidth] = useState(null);
  let [comfort, setComfort] = useState(null);
  let [quality, setQuality] = useState(null);
  let [length, setLength] = useState(null);
  let [fit, setFit] = useState(null);
  let [upload, setUpload] = useState(true);
  let [uploadedPics, setUploadedPics] = useState([]);
  // let [picURLs, setPicURLs] = useState([]);
  // let [file, setFile] = React.useState(null);

  // let characteristics = {
  //   size,
  //   width,
  //   comfort,
  //   quality,
  //   length,
  //   fit
  // };

  // const fileHandler = (e) => {
  //   setFile(e.target.files[0])
  // }

  // const createPhotoURL = async (photo) => {
  //   let newURL = URL.createObjectURL(photo);
  //   await setPicURLs([...picURLs, newURL]);
  //   return newURL;
  // }
  useEffect(() => {
    maxUpload()
  }, [uploadedPics]);


  const maxUpload = () => {
    if (uploadedPics.length === 5) {
      setUpload(false)
    }
  }

  const handlePhotoUpload = (e) => {
    setUploadedPics([...uploadedPics, e.target.files[0]])
    // setUpload(true);
    // console.log(uploadedPics)
  }

  const Input = styled('input')({
    display: 'none',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setRecommended(event.target.value);
  };

  const handleCharacteristics = (event) => {
    switch (event.target.name) {
      case "size":
        setSize(event.target.value)
        break;
      case "width":
        setWidth(event.target.value);
        break;
      case "comfort":
        setComfort(event.target.value);
        break;
      case "quality":
        setQuality(event.target.value);
        break;
      case "length":
        setLength(event.target.value);
        break;
      case "fit":
        setFit(event.target.value);
        break;
    }
  }



  // const handleReviewSubmit = () => {
  //   axios.post(`/products/${currentProduct}/reviews`, {
  //     product_id: `${currentProduct}`,
  //     rating: rating,
  //     summary: '',
  //     body: '',
  //     recommend: recommended,
  //     name: '',
  //     email: '',
  //     photos: picURLs,
  //     characteristics: {

  //     }
  //   })
  // }

  return (
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

          <FormControl sx={{ display: 'inline-flex', my: 1 }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Size</FormLabel>
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="size"
              onChange={handleCharacteristics}
              >
              <FormControlLabel value="1" control={<Radio />} label="Too small" />
              <FormControlLabel value="2" control={<Radio />} label="1/2 size too small" />
              <FormControlLabel value="3" control={<Radio />} label="Perfect" />
              <FormControlLabel value="4" control={<Radio />} label="1/2 size too big" />
              <FormControlLabel value="5" control={<Radio />} label="Too big" />
            </RadioGroup>
          </FormControl>

          <FormControl sx={{ display: 'inline-flex', my: 1 }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Width</FormLabel>
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="width"
              onChange={handleCharacteristics}
            >
              <FormControlLabel value="1" control={<Radio />} label="Too narrow" />
              <FormControlLabel value="2" control={<Radio />} label="Slightly narrow" />
              <FormControlLabel value="3" control={<Radio />} label="Perfect" />
              <FormControlLabel value="4" control={<Radio />} label="Slightly wide" />
              <FormControlLabel value="5" control={<Radio />} label="Too wide" />
            </RadioGroup>
          </FormControl>

          <FormControl sx={{ display: 'inline-flex', my: 1 }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Comfort</FormLabel>
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="comfort"
              onChange={handleCharacteristics}
            >
              <FormControlLabel value="1" control={<Radio />} label="Uncomfortable" />
              <FormControlLabel value="2" control={<Radio />} label="Slightly uncomfortable" />
              <FormControlLabel value="3" control={<Radio />} label="Ok" />
              <FormControlLabel value="4" control={<Radio />} label="Comfortable" />
              <FormControlLabel value="5" control={<Radio />} label="Perfect" />
            </RadioGroup>
          </FormControl>

          <FormControl sx={{ display: 'inline-flex', my: 1 }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Quality</FormLabel>
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="quality"
              onChange={handleCharacteristics}
            >
              <FormControlLabel value="1" control={<Radio />} label="Poor" />
              <FormControlLabel value="2" control={<Radio />} label="Below average" />
              <FormControlLabel value="3" control={<Radio />} label="What I expected" />
              <FormControlLabel value="4" control={<Radio />} label="Pretty great" />
              <FormControlLabel value="5" control={<Radio />} label="Perfect" />
            </RadioGroup>
          </FormControl>

          <FormControl sx={{ display: 'inline-flex', my: 1 }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Length</FormLabel>
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="length"
              onChange={handleCharacteristics}
            >
              <FormControlLabel value="1" control={<Radio />} label="Runs short" />
              <FormControlLabel value="2" control={<Radio />} label="Below average" />
              <FormControlLabel value="3" control={<Radio />} label="Perfect" />
              <FormControlLabel value="4" control={<Radio />} label="Slightly long" />
              <FormControlLabel value="5" control={<Radio />} label="Runs long" />
            </RadioGroup>
          </FormControl>

          <FormControl sx={{ display: 'inline-flex', my: 1 }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Fit</FormLabel>
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="fit"
              onChange={handleCharacteristics}
            >
              <FormControlLabel value="1" control={<Radio />} label="Runs tight" />
              <FormControlLabel value="2" control={<Radio />} label="Slightly tight" />
              <FormControlLabel value="3" control={<Radio />} label="Perfect" />
              <FormControlLabel value="4" control={<Radio />} label="Slightly loose" />
              <FormControlLabel value="5" control={<Radio />} label="Runs loose" />
            </RadioGroup>
          </FormControl>

          <FormControl sx={{display: 'block', my: 1}}>
          <TextField id="nickname" label="Nickname" variant="outlined" sx={{display: 'inline-flex', pr: 1}}/>
          <TextField id="email" label="Email" variant="outlined" sx={{display: 'inline-flex'}}/>

          </FormControl>

          <TextField id="review-body" label="Write your review here" autoFocus
            margin="dense" fullWidth variant="outlined" />


            <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="contained-button-file">

            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handlePhotoUpload} />

            {upload && <Button variant="contained" component="span">
              Upload photos
            </Button>}


            {uploadedPics.map(pic => {
              return <img id="uploaded-review-thumbnail" src={pic? URL.createObjectURL(pic) : null} alt={pic? pic.name : null} width="200" height="250"/>
            })}


            {/* {upload && uploadedPics.map(pic => {
              return <img id="uploaded-review-thumbnail" src={pic? () => {createPhotoURL(pic)} : null} alt={pic? pic.name : null}/>
            })} */}
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


export default ReviewForm;

// // TODO: if i click the X button or submit , change reviewForm state to false (close form)