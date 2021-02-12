import React from 'react';
import { Banner } from '../Question';
import "./dashboard.css";

export default function Login({ getSlug, slugToString }) {

  // Validate password & advance to portal
  function validatePassword() {
    // TODO: Validate password

    window.open(`/portal/${getSlug()}`, '_self');
  }

  return (
    <div>
      <Banner
        name={`${slugToString(getSlug())}'s Admin Portal`}
        image={'https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.nj.com/home/njo-media/width2048/img/entertainment_impact/photo/csm1016-oceanave-s010-ext-hero-dusk-final2000jpg-d3e3b1df09bff4be.jpg'}
      />
      <div className='admin-login-container'>
        <h1>Login</h1>
        <input
          type='password'
          placeholder={` Enter ${slugToString(getSlug())}'s password`}
        /><br />
        <button onClick={validatePassword}>
          Enter portal
        </button>
      </div>
    </div>
  );
}
