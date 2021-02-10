import React, { useState, useRef } from 'react';
import Banner from './Banner';
import Badges from './Badges';

// Material UI imports
import Rating from '@material-ui/lab/Rating';

import './question.css';

export default function RateReview({ staff, value, setValue, setFeedback, setRoute, apt_template, selectedStaffBadges, selectedAptBadges, setSelectedStaffBadges, setSelectedAptBadges }) {
  // Track of user rates <= 3 or > 3
  const [isGood, setIsGood] = useState(true);

  // Reference textarea's text
  const feedbackRef = useRef();

  // Preset responses based on the rating the user picks
  const [presets] = useState([
    `My interaction with ${(staff) ? staff : apt_template.aptName} was terrible because`,
    `My interaction with ${(staff) ? staff : apt_template.aptName} was poor because`,
    `My interaction with ${(staff) ? staff : apt_template.aptName} was okay because`,
    `My interaction with ${(staff) ? staff : apt_template.aptName} was good because`,
    `My interaction with ${(staff) ? staff : apt_template.aptName} was great because`
  ]);

  // Temp badges for staff
  const [staffBadges] = useState([
    { text: 'Friendly' },
    { text: 'Helpful' },
    { text: 'Punctual' },
    { text: 'Resourceful' },
    { text: 'Rude' },
    { text: 'Unhelpful' }
  ]);

  // Temp badges for apt
  const [aptBadges] = useState([
    { text: 'Great Amentities' },
    { text: 'Spacious' },
    { text: 'Pet Friendly' },
    { text: 'Great Value' }
  ]);

  // Handle button click on Rate component
  function handleContinue() {
    // If value less than or equal to 3, ask user for feedback
    if (value <= 3) {
      setIsGood(false);
    }
    // Else, prompt user with Google review
    else {
      setRoute(apt_template.reviewLink);
    }
  }

  // Handle button click on Review component
  function handleShareFeedback() {
    // Get textarea feedback & put it into feedback state
    const newFeedback = feedbackRef.current.value;
    setFeedback(newFeedback);
    // Open next route for user - /exit-page
    setRoute('/exit-page');
  }

  return (
    <div>
      <Banner name={apt_template.aptName} image={"https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.nj.com/home/njo-media/width2048/img/entertainment_impact/photo/csm1016-oceanave-s010-ext-hero-dusk-final2000jpg-d3e3b1df09bff4be.jpg"} />
      <h1 className='question-text'>
        Your review for {(staff) ? staff : apt_template.aptName}:
      </h1>
      {(isGood) ? (
        <Rate
          staffBadges={staffBadges}
          aptBadges={aptBadges}
          value={value}
          setValue={setValue}
          handleContinue={handleContinue}
          selectedStaffBadges={selectedStaffBadges}
          selectedAptBadges={selectedAptBadges}
          setSelectedStaffBadges={setSelectedStaffBadges}
          setSelectedAptBadges={setSelectedAptBadges}
        />
      ) : (
        <Review
          feedbackRef={feedbackRef}
          presets={presets}
          value={value}
          handleShareFeedback={handleShareFeedback}
        />
      )}
    </div>
  );
}

// Component for rate portion of review
function Rate({ staffBadges, aptBadges, value, setValue, handleContinue, selectedStaffBadges, selectedAptBadges, setSelectedStaffBadges, setSelectedAptBadges }) {
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
      <h3>
        Staff feedback:
      </h3>
      <Badges
        badges={staffBadges}
        selected={selectedStaffBadges}
        setSelected={setSelectedStaffBadges}
      />
      <h3>
        Apartment feedback:
      </h3>
      <Badges
        badges={aptBadges}
        selected={selectedAptBadges}
        setSelected={setSelectedAptBadges}
      />
      <div className='center-div'>
        <button onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

// Component for review portion of review
function Review({ feedbackRef, presets, value, handleShareFeedback }) {
  return (
    <div className='review-container'>
      <h3>
        What can we do better? (optional):
      </h3>
      <textarea ref={feedbackRef}>
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
