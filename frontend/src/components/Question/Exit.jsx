import React from 'react';
import Banner from './Banner';
import './question.css';

export default function Exit({ apt_template, question_template }) {
  return (
    <div>
      <Banner name={apt_template.name} image={apt_template.image} />
      <h1 className='exit-text'>
        Thank you for your review. <br /> We look forward to
        making {apt_template.name} a better place!
      </h1>
    </div>
  );
}
