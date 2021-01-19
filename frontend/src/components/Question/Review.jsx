import React from 'react';
import Banner from './Banner';
import './question.css';

export default function Review({ apt_template }) {
  return (
    <div>
      <Banner name={apt_template.name} image={apt_template.image} />
    </div>
  );
}
