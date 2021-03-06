import React, { useState, useEffect } from 'react';
import { Question, Exit, SpecialOffer, Review } from './index.js';

import HOST from '../../utils/request.js';

// Question templates
import {
  // apt_template,
  question_template,
  question_template1,
  question_template2,
  question_template3,
  question_template4
} from './question.test.js';

export default function Survey({ getApartment, getSlug }) {
  // Track which route user is on
  const [route, setRoute] = useState('/');

  // Track 'who' for tour, lease or maintenance route
  const [who, setWho] = useState("");
  // Track rating of user's interaction with staff/apt
  const [rating, setRating] = useState(4);
  // Track selected badges for staff
  const [selectedStaffBadges, setSelectedStaffBadges] = useState([]);
  // Track selected badges for apt
  const [selectedAptBadges, setSelectedAptBadges] = useState([]);
  // Track optional feedback
  const [feedback, setFeedback] = useState("");

  // Save templates
  const [aptTemplate, setAptTemplate] = useState();
  const [staffTemplate, setStaffTemplate] = useState();
  const [leasedTemplate, setLeasedTemplate] = useState();
  const [maintenanceTemplate, setMaintenanceTemplate] = useState();

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

  // Get all leasing staff and append to existing question template
  function getLeasingStaff(slug) {
    fetch(`${HOST}/users/${slug}/Staff`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Tour template
        const temp = question_template3;
        createAnswer(data.users, temp.answers);
        setStaffTemplate(temp);
        // Leased template
        const temp1 = question_template4;
        createAnswer(data.users, temp1.answers);
        setLeasedTemplate(temp1);
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  // Get all maintenance staff and append to existing question template
  function getMaintenance(slug) {
    fetch(`${HOST}/users/${slug}/Maintenance`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const temp = question_template2;
        createAnswer(data.users, temp.answers);
        setMaintenanceTemplate(temp);
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  // Helper function to combine user info with question template
  // Parameters: list of objects, empty list to be modified
  function createAnswer(newList, emptyList) {
    // Loop through newList
    for (let item of newList) {
      // Create obj with the items we want
      let newItem = {
        id: item.id,
        text: item.name,
        nextURL: "/special-offer"
      };
      // Push newItem to emptyList
      emptyList.push(newItem);
    }
  }

  useEffect(() => {
    getApartment(setAptTemplate, getSlug());
    getLeasingStaff(getSlug());
    getMaintenance(getSlug());
  }, []);

  return (
    <>
    {(route === '/' && aptTemplate) &&
      <Question
        setRoute={handleRouteUpdate}
        apt_template={aptTemplate}
        question_template={question_template}
      />
    }
    {(route === '/toured-community' && aptTemplate && staffTemplate) &&
      <Question
        setWho={setWho}
        setRoute={handleRouteUpdate}
        apt_template={aptTemplate}
        question_template={staffTemplate}
      />
    }
    {(route === '/maintenance-completed' && aptTemplate && maintenanceTemplate) &&
      <Question
        setWho={setWho}
        setRoute={handleRouteUpdate}
        apt_template={aptTemplate}
        question_template={maintenanceTemplate}
      />
    }
    {(route === '/signed-lease' && aptTemplate && leasedTemplate) &&
      <Question
        setWho={setWho}
        setRoute={handleRouteUpdate}
        apt_template={aptTemplate}
        question_template={leasedTemplate}
      />
    }
    {(route === '/ask-review' && aptTemplate) &&
      <Question
        setRoute={handleRouteUpdate}
        apt_template={aptTemplate}
        question_template={question_template1}
      />
    }
    {(route === '/give-review' && aptTemplate) &&
      <Review
        staff={who.name}
        setRoute={handleRouteUpdate}
        setFeedback={setFeedback}
        value={rating}
        setValue={setRating}
        apt_template={aptTemplate}
        staffBadges={aptTemplate.aptBadges.staff}
        aptBadges={aptTemplate.aptBadges.apt}
        selectedStaffBadges={selectedStaffBadges}
        selectedAptBadges={selectedAptBadges}
        setSelectedStaffBadges={setSelectedStaffBadges}
        setSelectedAptBadges={setSelectedAptBadges}
      />
    }
    {(route === '/special-offer' && aptTemplate) &&
      <SpecialOffer
        setRoute={handleRouteUpdate}
        apt_template={aptTemplate}
      />
    }
    {(route === '/exit-page' && aptTemplate) &&
      <Exit
        getSlug={getSlug}
        who={who}
        apt_template={aptTemplate}
        rating={rating}
        feedback={feedback}
        selectedStaffBadges={selectedStaffBadges}
        selectedAptBadges={selectedAptBadges}
      />
    }
    </>
  );
}
