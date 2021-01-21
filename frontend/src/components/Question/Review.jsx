import React, { useState } from 'react';
import Banner from './Banner';

// Material UI imports
import Rating from '@material-ui/lab/Rating';

import './question.css';

export default function RateReview({ apt_template }) {
  // Track of user rates <= 3 or > 3
  const [isGood, setIsGood] = useState(true);
  const [staff] = useState('Amulya Parmar');
  const [value, setValue] = useState(0);

  // Preset responses based on the rating the user picks
  const [presets] = useState([
    `My interaction with ${staff} was terrible because`,
    `My interaction with ${staff} was poor because`,
    `My interaction with ${staff} was okay because`,
    `My interaction with ${staff} was good because`,
    `My interaction with ${staff} was great because`
  ]);

  // Handle button click on Rate component
  function handleContinue() {
    // If value less than or equal to 3, ask user for feedback
    if (value <= 3) {
      setIsGood(false);
    }
    // Else, prompt user with Google review
    else {
      window.open(apt_template.review_link, '_self');
    }
  }

  // Handle button click on Review component
  function handleShareFeedback() {
    // TODO: backend save feedback into database
    // Open next route for user - /exit-page
    window.open('/exit-page', '_self');
  }

  return (
    <div>
      <Banner name={apt_template.name} image={apt_template.image} />
      <h1 className='question-text'>
        Your review for Amulya Parmar:
      </h1>
      {(isGood) ? (
        <Rate value={value} setValue={setValue} handleContinue={handleContinue} />
      ) : (
        <Review presets={presets} value={value} handleShareFeedback={handleShareFeedback} />
      )}
    </div>
  );
}

// Component for rate portion of review
function Rate({ value, setValue, handleContinue }) {
  return (
    <div className='review-container'>
      <h3>
        Rating:
      </h3>
      <div className='center-div'>
        <Rating
          name="rating-component"
          defaultValue={value}
          precision={0.5}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          size="large"
        />
      </div>
      <div className='center-div'>
        <button onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

// Component for review portion of review
function Review({ presets, value, handleShareFeedback }) {
  return (
    <div className='review-container'>
      <h3>
        What can we do better? (optional):
      </h3>
      <textarea>
        {presets[parseInt(Math.ceil(value - 1))]}
      </textarea>
      <div className='center-div'>
        <button onClick={handleShareFeedback}>
          Share feedback
        </button>
      </div>
    </div>
  );
}
