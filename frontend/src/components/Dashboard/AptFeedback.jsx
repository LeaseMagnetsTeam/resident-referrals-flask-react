import React from 'react';

// Material UI imports
import Rating from '@material-ui/lab/Rating';

export default function ApartmentFeedback() {
  return (
    <div className='dashboard-apt-container'>
      <h1>Apartment Feedback</h1>
      <div className='inline-block center'>
        <h1>128</h1>
        <p>Reviews generated</p>
      </div>
      <div className='inline-block center'>
        <Rating
          name="rating-component"
          defaultValue={4.5}
          precision={0.5}
          readOnly
          size="large"
        />
        <p>Average rating</p>
      </div>
    </div>
  );
}
