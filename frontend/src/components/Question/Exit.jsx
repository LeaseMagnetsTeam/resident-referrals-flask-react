import React, { useEffect } from 'react';
import Banner from './Banner';
import './question.css';

export default function Exit({ who, apt_template, question_template, rating, feedback, selectedStaffBadges, selectedAptBadges }) {
  // After all data is collected, send data to backend via json
  useEffect(() => {
    const data = {
      apartment_id: apt_template.id,
      apartment_name: apt_template.name,
      interacted_with: who,
      rating: parseInt(rating),
      optional_feedback: feedback,
      staff_badges: selectedStaffBadges,
      apt_badges: selectedAptBadges
    };
    // TODO: Send data to a backend route
    console.log(data);
  });

  return (
    <div>
      <Banner name={apt_template.name} image={apt_template.image} />
      <h1 className='exit-text'>
        Thank you for your response. <br /> We look forward to
        making {apt_template.name} a better place!
      </h1>
    </div>
  );
}
