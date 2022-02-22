import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


const QuestionForm = ({productId, productName, addedQuestion}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true) };
  const handleClose = () => { setOpen(false) };

  let [body, setBody] = useState('');
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');


  const handleChange = (event) => {
    let ename = event.target.name;
    let value = event.target.value;

    if(ename === "body") {
      setBody(value)
    }
    if(ename === "username") {
      setName(value)
    }
    if(ename === "email") {
      setEmail(value)
    }
  };

  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true
    }
      return false
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    let message = {body, name, email, product_id: Number(productId) }
    if (body === '' || name === '' || email === '') {
      return alert("You must enter the following: question/nickname/email")
    } else if (!validateEmail(email)) {
      return  alert("You have entered an invalid email address!")
    } else {
      axios.post(`/api/products/${productId}/qa/questions`, message)
        .then(() => {
          setBody('');
          setName('');
          setEmail('');
        })
        .then(addedQuestion())
        .then(handleClose())
        .catch((err) => { console.log('Cannot submit your question', err)})
    }
  }

  return (
    <div>
      <button className="question-button" onClick={handleOpen}>
        Add Question +
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ask Your Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            About the {productName}
          </DialogContentText>
          <TextField
            required
            id="outline-required"
            label="Your Question (max 1000 characters)"
            name="body"
            placeholder="Enter your question here..." required
            value={body}
            autoFocus
            margin="dense"
            maxLength="1000"
            fullWidth
            multiline={true}
            rows={4}
            onChange={handleChange}

            />
           <TextField
            required
            helperText="“For privacy reasons, do not use your full name or email address"
            id="outlined-required"
            label="Your Nickname (max 60 characters)"
            type="text"
            name="username"
            placeholder="Example: Jack123"
            value={name}
            maxLength="60"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            required
            helperText="For authentication reasons, you will not be emailed"
            id="outlined-required"
            label="Email (max 60 characters)"
            type="email"
            name="email"
            value={email}
            placeholder="Example: jack@email.com" required
            maxLength="60"
            fullWidth
            onChange={handleChange}
          />

        </DialogContent>
        <DialogActions>
          <button className="question-button" onClick={handleClose}>Cancel</button>
          <button className="question-button" onClick={handleSubmit}>Submit</button>
        </DialogActions>
      </Dialog>
    </div>
  );

}

export default QuestionForm;