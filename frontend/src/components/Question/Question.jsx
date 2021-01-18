import React from 'react';
import Banner from './Banner';
import './question.css';

export default function Question({ apt_template, question_template }) {
  return (
    <div>
      <Banner name={apt_template.name} image={apt_template.image} />
      <h1 className='question-text'>
        {question_template.question}
      </h1>
      {question_template.answers.map((answer, idx) => {
        return (
          <Answer idx={idx} text={answer.text} nextURL={answer.nextURL} />
        );
      })}
    </div>
  );
}

// Answer button
function Answer({ idx, text, nextURL }) {
  return (
    <a href={nextURL}>
      <button className='answer-choice'>
        <div className='letter-container'>
          <div className='letter'>
            {String.fromCharCode(idx + 65)}
          </div>
        </div>
        {text}
      </button>
    </a>
  );
}
