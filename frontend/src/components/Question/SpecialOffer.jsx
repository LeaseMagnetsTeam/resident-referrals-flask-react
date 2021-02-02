import React, { useState } from 'react';
import Banner from './Banner';
import './question.css';

export default function SpecialOffer({ setRoute, apt_template }) {
  // Keep track of whether user clicks Yes or No
  const [wantsOffer, setWantsOffer] = useState(false);

  return (
    <div>
      <Banner name={apt_template.aptName} image={apt_template.image} />
      <div>
        <h1 className='question-text'>
          Would you like to receive special offers?
        </h1>
        <button className='answer-choice' onClick={() => setWantsOffer(true)}>
          <div className='center-div letter-container'>
            <div className='letter'>
              A
            </div>
          </div>
          Yes, of course!
        </button>
        {(wantsOffer) && <OfferForm setRoute={setRoute} />}
        <button className='answer-choice' onClick={() => setRoute('/ask-review')}>
          <div className='center-div letter-container'>
            <div className='letter'>
              B
            </div>
          </div>
          No thank you, I don't want special offers.
        </button>
      </div>
    </div>
  );
}

// Form for handling user data for opt-in SMS/email
function OfferForm({ setRoute }) {
  // Keep track of form values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // Track of errors/missing inputs
  const [error, setError] = useState('');

  // Validate form inputs & subscribe user to SMS/email notifications
  function handleFormSubmit(event) {
    event.preventDefault();
    // Error handling
    const emailPattern = /^\S+@\S+\.\S+/;
    const phonePattern = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*/;
    // Ensure user inputs name
    if (!name) {
      setError('name');
      return;
    }
    // Ensure user inputs email & validate email format
    if (!email || !emailPattern.test(email)) {
      setError('email');
      return;
    }
    // Ensure user inputs phone number & validate number format
    if (!phone || !phonePattern.test(phone)) {
      setError('phone');
      return;
    }
    console.log(name, email, phone);
    console.log('TODO: handle form submit via backend post request');
    setRoute('/ask-review');
  }

  // Resets form values' states
  function handleFormReset() {
    setName('');
    setEmail('');
    setPhone('');
  }

  return (
    <div className='center-div offer-form'>
      <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
        <input
          type='text'
          placeholder='Your full name'
          onChange={(e) => {setName(e.target.value);}}
        /><br />
        {(error === 'name') && <div className='red'><h5>Please input your name.</h5></div>}
        <input
          type='email'
          placeholder='Your email'
          onChange={(e) => {setEmail(e.target.value);}}
        /><br />
        {(error === 'email') && <div className='red'><h5>Please input a valid email.</h5></div>}
        <input
          type='text'
          placeholder='Your cell phone number'
          onChange={(e) => {setPhone(e.target.value);}}
        /><br />
        {(error === 'phone') && <div className='red'><h5>Please input a valid phone number.</h5></div>}
        <div className='center-div'>
          <input type='submit' value='Confirm' />
          <input type='reset' value='Clear' />
        </div>
      </form>
    </div>
  );
}
