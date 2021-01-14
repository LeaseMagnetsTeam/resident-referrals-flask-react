import React from 'react';
import './question.css';

// Testing backend without backend server
import { apt_template, question_template } from './question.test.js';

export default function Question() {
  return (
    <div>
      <Banner name={apt_template.name} image={apt_template.image} />
      <h1 className='question-text'>
        {question_template.question}
      </h1>
      {question_template.answers.map((answer) => {
        return (
          <Answer text={answer.text} nextURL={answer.nextURL} />
        );
      })}
    </div>
  );
}

// Welcome message banner
function Banner({ name, image }) {
  return (
    <div
      style={{background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${image}) no-repeat center`}}
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

// Answer button
function Answer({ text, nextURL }) {
  return (
    <a href={nextURL}>
      <button className='answer-choice'>
        {text}
      </button>
    </a>
  );
}
