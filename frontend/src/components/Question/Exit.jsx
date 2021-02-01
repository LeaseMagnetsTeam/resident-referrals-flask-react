import React, { useEffect } from 'react';
import Banner from './Banner';
import './question.css';

export default function Exit({ who, apt_template, question_template, rating, feedback, selectedStaffBadges, selectedAptBadges }) {
  // After all data is collected, send data to backend via json
  useEffect(() => {
    // TODO: Handle badges...

    // const data = {
    //   apartment_id: apt_template.id,
    //   apartment_name: apt_template.aptName,
    //   interacted_with: who,
    //   rating: parseInt(rating),
    //   optional_feedback: feedback,
    //   staff_badges: selectedStaffBadges,
    //   apt_badges: selectedAptBadges
    // };
    // IDEA: manually put default/not sure/other as user_id = 0, so gen apt reviews go here
    const user_id = (who) ? who.user_id : 0;

    const data = {
      apartment_id: apt_template.id,
      user_id: parseInt(user_id),
      rating: parseInt(rating),
      review: ((who && feedback.length <= 41 + who.name.length) ? '' : feedback)
    }
    // POST review to backend
    fetch(`http://localhost:8080/resident-review/${apt_template.id}/${user_id}`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      })
  });

  return (
    <div>
      <Banner name={apt_template.aptName} image={apt_template.image} />
      <h1 className='exit-text'>
        Thank you for your response. <br /> We look forward to
        making {apt_template.aptName} a better place!
      </h1>
    </div>
  );
}
