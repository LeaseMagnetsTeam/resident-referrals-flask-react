import React, { useState } from 'react';
import Banner from './Banner';

// Material UI imports
import Rating from '@material-ui/lab/Rating';

import './question.css';

export default function Review({ apt_template }) {
  const [value, setValue] = useState(0);
  return (
    <div>
      <Banner name={apt_template.name} image={apt_template.image} />
      <h1 className='question-text'>
        Your review for Amulya Parmar:
      </h1>
      <div className='review-container'>
        <h3>
          Rating:
        </h3>
        <div className='center-div'>
          <Rating
            name="rating-component"
            defaultValue={value}
            precision={0.5}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            size="large"
          />
        </div><br />
        <h3>
          Review (optional):
        </h3>
        <textarea>
          I enjoyed my interaction with Amulya Parmar because...
        </textarea>
        <div className='center-div'>
          <button>Submit Review</button>
        </div>
      </div>
    </div>
  );
}
