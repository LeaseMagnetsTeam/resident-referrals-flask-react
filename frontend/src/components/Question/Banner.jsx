import React from 'react';

// Welcome message banner
export default function Banner({ name, image }) {
  return (
    <div
      style={{background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image}) no-repeat center`}}
      className='question-banner'
    >
      <div className='question-banner-text'>
        Welcome to
        <h2>
           {name}
        </h2>
      </div>
    </div>
  );
}
