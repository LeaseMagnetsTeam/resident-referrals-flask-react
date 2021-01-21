import React from 'react';

export default function Navbar() {
  function openLandingPage() {
    window.open('/', '_self');
  }

  return (
    <div className='navbar' onClick={openLandingPage}>
      <span className='white'>RESIDENTS.
      <span className='light-grey'>CO</span></span>
    </div>
  );
}
