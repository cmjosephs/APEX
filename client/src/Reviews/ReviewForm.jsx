import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ReviewForm = () => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [recommended, setRecommended] = React.useState(true);

  const handleChange = (event) => {
    setRecommended(event.target.value);
  };


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Write A Review
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Write A Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please share your experience.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />


          <FormControl sx={{ width: 1/4 }}>
            <InputLabel id="demo-simple-select-label">Do you recommend this product?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={recommended}
              label="Do you recommend this product?"
              onChange={handleChange}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>


          <TextField id="review-body" label="Write your review here" autoFocus
            margin="dense" fullWidth variant="outlined" />
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