import React, { useState, useEffect } from 'react';
import Badge from './Badge';

// Material UI imports
import Rating from '@material-ui/lab/Rating';

export default function ApartmentFeedback({ apt, badges }) {
  // Number of reviews & rating
  const [amount, setAmount] = useState(0);
  const [rating, setRating] = useState(0);
  // Get amount of reviews
  function getNumReviews() {
    fetch(`http://localhost:8080/reviews/${apt.id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAmount(data.reviews.length);

        // Get average rating
        let total = 0.0;
        for (const review of data.reviews) {
          total += review.rating;
        }
        if (data.reviews.length !== 0) setRating(total / data.reviews.length);
        else setRating(5);
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  useEffect(() => {
    getNumReviews();
  }, []);

  return (
    <div className='dashboard-apt-container'>
      <h1>Apartment Feedback</h1>
      <div className='dashboard-badge-container'>
        {Object.entries(badges).map(([key,value]) => {
          return (
              <Badge number={value} text={key.toLowerCase()} />
          );
        })}
      </div>
      <div className='inline-block center'>
        <h1>{amount}</h1>
        <p>Reviews generated</p>
      </div>
      <div className='inline-block center'>
        {(rating) &&
          <Rating
            name="rating-component"
            defaultValue={rating}
            precision={0.5}
            readOnly
            size="large"
          />}
        <p>Average rating</p>
      </div>
    </div>
  );
}
