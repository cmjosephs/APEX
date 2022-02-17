import React, { useState, useContext } from 'react';
import { ProductContext } from './ReviewList.jsx';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


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

  let characteristics = {
    size,
    width,
    comfort,
    quality,
    length,
    fit
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

  return (
    <div className="review-form">
      <Button variant="outlined" onClick={handleClickOpen}>
        Write A Review
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='md'
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

          <FormControl sx={{ display: 'block'}}>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newRating) => {
                  setRating(newRating);
                }}
              />

          </FormControl>

          <FormControl sx={{ display: 'block' }}>
            <InputLabel id="demo-simple-select-label">Do you recommend this product?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={recommended}
              label="Do you recommend this product?"
              onChange={handleChange}
              sx={{ display: 'block', width: 1/4}}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ display: 'block' }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Size</FormLabel>
            <RadioGroup
              row
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

          <FormControl sx={{ display: 'block' }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Width</FormLabel>
            <RadioGroup
              row
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

          <FormControl sx={{ display: 'block' }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Comfort</FormLabel>
            <RadioGroup
              row
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

          <FormControl sx={{ display: 'block' }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Quality</FormLabel>
            <RadioGroup
              row
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

          <FormControl sx={{ display: 'block' }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Length</FormLabel>
            <RadioGroup
              row
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

          <FormControl sx={{ display: 'block' }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Fit</FormLabel>
            <RadioGroup
              row
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

          <FormControl sx={{display: 'block'}}>
          <TextField id="nickname" label="Nickname" variant="outlined" sx={{display: 'inline-flex'}}/>
          <TextField id="email" label="Email" variant="outlined" sx={{display: 'inline-flex'}}/>

          </FormControl>

{/*
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            variant="standard"
            sx={{ display: 'inline', y: 3}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="nickname"
            label="Nickname"
            type="name"
            variant="standard"
            sx={{ display: 'inline', y: 3}}
          /> */}
          <TextField id="review-body" label="Write your review here" autoFocus
            margin="dense" fullWidth variant="outlined" />
            {/* </FormControl> */}
        </DialogContent>


        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );


}


export default ReviewForm;

// // TODO: if i click the X button or submit , change reviewForm state to false (close form)