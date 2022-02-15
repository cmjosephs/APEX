import React from 'react';
import axios from 'axios';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import { FixedSizeList } from 'react-window';

const ReviewListEntry = ({ review }) => {
  // let [longReview, setLongReview] = useState(false)


  return (
    <div className="review-tile">
      <div className="review-details">{review.reviewer_name} | {new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
        day: '2-digit'
      }).format(parseInt(review.date))}</div>
      {/* <div className="review-details">{review.reviewer_name} | {review.date.substring(0, 10)}</div> */}
      <div className="review-summary">{review.summary}</div>
      <div className="review-body">{review.body}</div>

      {/* <ListItem>
      <ListItemText secondary={<div className="review-details">{review.reviewer_name} | {review.date.substring(0, 10)}</div>}/>
      <ListItemText primary={<div className="review-summary">{review.summary}</div>}/>
      <ListItemText primary={<div className="review-body">{review.body}</div>}/>
      </ListItem> */}
    </div>
  )
}

export default ReviewListEntry;

// if review body contains more than 250 characters, have a see more link that displays the rest of the review body