import React from 'react';

export default function Navbar() {
  function openLandingPage() {
    window.open('/', '_self');
  }

  return (
    <div className='navbar' onClick={openLandingPage}>
      <span className='dark-grey'>RESIDENTS.
      <span className='light-grey'>ME</span></span>
    </div>
  );
}
