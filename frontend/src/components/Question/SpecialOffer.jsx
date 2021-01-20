import React, { useState } from 'react';
import Banner from './Banner';
import './question.css';

export default function SpecialOffer({ apt_template }) {
  // Keep track of whether user clicks Yes or No
  const [wantsOffer, setWantsOffer] = useState(false);

  return (
    <div>
      <Banner name={apt_template.name} image={apt_template.image} />
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
        {(wantsOffer) && <OfferForm />}
        <a href='/exit-page'>
          <button className='answer-choice'>
            <div className='center-div letter-container'>
              <div className='letter'>
                B
              </div>
            </div>
            No thank you, I don't want special offers.
          </button>
        </a>
      </div>
    </div>
  );
}

// Form for handling user data for opt-in SMS/email
function OfferForm() {
  // Keep track of form values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // TODO: this function handles form submit
  function handleFormSubmit(event) {
    event.preventDefault();
    // Error handling
    // Ensure user inputs name
    if (!name) {
      return;
    }
    // Ensure user inputs email & validate email format
    if (!email) {
      return;
    }
    // Ensure user inputs phone number & validate number format
    if (!phone) {
      return;
    }
    console.log(name, email, phone);
    console.log('TODO: handle form submit via backend post request');
    window.open('/ask-google-review', '_self');
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
        <input
          type='email'
          placeholder='Your email'
          onChange={(e) => {setEmail(e.target.value);}}
        /><br />
        <input
          type='text'
          placeholder='Your cell phone number'
          onChange={(e) => {setPhone(e.target.value);}}
        /><br />
        <div className='center-div'>
          <input type='submit' value='Confirm' />
          <input type='reset' value='Clear' />
        </div>
      </form>
    </div>
  );
}
