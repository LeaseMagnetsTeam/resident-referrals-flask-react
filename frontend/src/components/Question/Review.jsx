import React, { useState } from 'react';
import Banner from './Banner';

// Material UI imports
import Rating from '@material-ui/lab/Rating';

import './question.css';

export default function RateReview({ apt_template }) {
  // Track of user rates <= 3 or > 3
  const [isGood, setIsGood] = useState(true);
  const [staff] = useState('Amulya Parmar');
  const [value, setValue] = useState(3);

  // Preset responses based on the rating the user picks
  const [presets] = useState([
    `My interaction with ${staff} was terrible because`,
    `My interaction with ${staff} was poor because`,
    `My interaction with ${staff} was okay because`,
    `My interaction with ${staff} was good because`,
    `My interaction with ${staff} was great because`
  ]);
  // const [presets] = useState([
  //   'terrible', 'poor', 'okay', 'good', 'great'
  // ]);

  // Current preset
  // const [preset, setPreset] = useState('great');

  // Return preset response based on given value
  // function getPreset(value) {
  //   const temp = presets;
  //   console.log(temp, Math.ceil(value - 1), temp[parseInt(Math.ceil(value - 1))]);
  //   setPreset(temp[parseInt(Math.ceil(value - 1))]);
  // }

  return (
    <div>
      <Banner name={apt_template.name} image={apt_template.image} />
      <h1 className='question-text'>
        Your review for Amulya Parmar:
      </h1>
      {(isGood) ? (
        <Rate value={value} setValue={setValue} />
      ) : (
        <Review presets={presets} value={value} />
      )}
    </div>
  );
}

// Component for rate portion of review
function Rate({ value, setValue }) {
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
        <button>Continue</button>
      </div>
    </div>
  );
}

// Component for review portion of review
function Review({ presets, value }) {
  return (
    <div className='review-container'>
      <h3>
        Review (optional):
      </h3>
      <textarea>
        {presets[parseInt(Math.ceil(value - 1))]}
      </textarea>
      <div className='center-div'>
        <button>Share feedback</button>
      </div>
    </div>
  );
}
