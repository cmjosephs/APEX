import React from 'react';

var Photos = ({ photos }) => {
  // console.log(photos);

  return (
    <>
      <div>photo display</div>
      <img src={photos[0].thumbnail_url} alt="no image"></img>
    </>
  )
}

export default Photos;