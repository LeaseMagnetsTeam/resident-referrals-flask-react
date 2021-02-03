import React, { useState, useEffect } from 'react';
import { Banner } from '../Question';
import "./dashboard.css";

export default function Login() {
  const [slug, setSlug] = useState();
  const [aptName, setAptName] = useState();

  function getSlug() {
    // Split URL by '/'
    const url = window.location.href.split('/');
    setSlug(url[url.length - 1]);
    // Split slug by -
    const splitSlug = url[url.length - 1].split('-');
    // Add each word with uppercase first letter into tempSlug
    let tempSlug = "";
    for (let word of splitSlug) {
      tempSlug += word[0].toUpperCase() + word.substring(1) + " ";
    }
    // Remove last space
    setAptName(tempSlug.trim());
  }

  // Validate password & advance to portal
  function validatePassword() {
    // TODO: Validate password

    window.open(`/portal/${slug}`, '_self');
  }

  useEffect(() => {
    getSlug();
  }, []);

  return (
    <div>
      <Banner
        name={`${aptName}'s Admin Portal`}
        image={'https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.nj.com/home/njo-media/width2048/img/entertainment_impact/photo/csm1016-oceanave-s010-ext-hero-dusk-final2000jpg-d3e3b1df09bff4be.jpg'}
      />
      <div className='admin-login-container'>
        <h1>Login</h1>
        <input
          type='password'
          placeholder={` Enter ${aptName}'s password`}
        /><br />
        <button onClick={validatePassword}>
          Enter portal
        </button>
      </div>
    </div>
  );
}
