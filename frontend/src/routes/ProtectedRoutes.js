import React, { useState } from 'react';

// import { SignUp, SignIn, ResetPassword } from '../components/Auth';
import { Navbar } from "../components/Navbar"
import { Question, Exit, SpecialOffer, Review } from '../components/Question';

// Testing backend without backend server
import {
  apt_template,
  question_template,
  question_template1,
  question_template3
} from '../components/Question/question.test.js';

const ProtectedRoutes = () => {
  // Track which route user is on
  const [route, setRoute] = useState('/');

  // TODO: Track 'who' for tour or maintenance route

  // Track rating of user's interaction with staff/apt
  const [rating, setRating] = useState(4);
  // Track selected badges for staff
  const [selectedStaffBadges, setSelectedStaffBadges] = useState([]);
  // Track selected badges for apt
  const [selectedAptBadges, setSelectedAptBadges] = useState([]);
  // Track optional feedback
  const [feedback, setFeedback] = useState("");

  // Handle updating the route
  function handleRouteUpdate(route) {
    if (route[0] === '/') {
      setRoute(route);
    }
    else {
      window.open(route);
      setRoute('/exit-page');
    }
  }

  return (
    <>
      <Navbar />
      {(route === '/') &&
        <Question
          setRoute={handleRouteUpdate}
          apt_template={apt_template}
          question_template={question_template}
        />
      }
      {(route === '/toured-community') &&
        <Question
          setRoute={handleRouteUpdate}
          apt_template={apt_template}
          question_template={question_template3}
        />
      }
      {(route === '/ask-review') &&
        <Question
          setRoute={handleRouteUpdate}
          apt_template={apt_template}
          question_template={question_template1}
        />
      }
      {(route === '/give-review') &&
        <Review
          setRoute={handleRouteUpdate}
          setFeedback={setFeedback}
          value={rating}
          setValue={setRating}
          apt_template={apt_template}
          selectedStaffBadges={selectedStaffBadges}
          selectedAptBadges={selectedAptBadges}
          setSelectedStaffBadges={setSelectedStaffBadges}
          setSelectedAptBadges={setSelectedAptBadges}
        />
      }
      {(route === '/special-offer') &&
        <SpecialOffer
          setRoute={handleRouteUpdate}
          apt_template={apt_template}
        />
      }
      {(route === '/exit-page') &&
        <Exit
          apt_template={apt_template}
          rating={rating}
          feedback={feedback}
          selectedStaffBadges={selectedStaffBadges}
          selectedAptBadges={selectedAptBadges}
        />
      }
    </>
  );
};

export default ProtectedRoutes;
