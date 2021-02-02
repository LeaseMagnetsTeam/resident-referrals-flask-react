import React from 'react';
import { MeIcon } from '../../images/Icon';

export default function Navbar() {
  function openLandingPage() {
    window.open('/', '_self');
  }

  return (
    <div className='navbar' onClick={openLandingPage}>
      <div className='navbar-flex'>
      <span className='dark-grey'>residents</span>
      <MeIcon />
      </div>
    </div>
  );
}
