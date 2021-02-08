import React from 'react';
import Badge from './Badge';

// Material UI imports
import Rating from '@material-ui/lab/Rating';

// TODO: map out aptBadges and pass in rating for defaultValue
export default function ApartmentFeedback({ aptBadges, rating }) {
  return (
    <div className='dashboard-apt-container'>
      <h1>Apartment Feedback</h1>
      <div className='dashboard-badge-container'>
        <Badge number={30} text={"pet-friendly"} />
        <Badge number={50} text={"great value"} />
      </div>
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
