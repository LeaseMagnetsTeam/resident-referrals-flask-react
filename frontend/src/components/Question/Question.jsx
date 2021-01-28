import React from 'react';
import Banner from './Banner';
import './question.css';

export default function Question({ setRoute, apt_template, question_template, setWho }) {
  return (
    <div>
      <Banner name={apt_template.name} image={apt_template.image} />
      <h1 className='question-text'>
        {question_template.question}
      </h1>
      {question_template.answers.map((answer, idx) => {
        return (
          <Answer setWho={setWho} setRoute={setRoute} idx={idx} text={answer.text} nextURL={answer.nextURL} />
        );
      })}
    </div>
  );
}

// Answer button
function Answer({ setWho, setRoute, idx, text, nextURL }) {
  // Handle button click
  function handleClick() {
    setRoute(nextURL);
    // If this question is asking for who the user interacted with
    if (setWho) setWho(text);
    // if (typeof(setWho) === 'function') {
    //   console.log("yessir");
    //   //setWho(text);
    // }
  }

  return (
    <button className='answer-choice' onClick={handleClick}>
      <div className='center-div letter-container'>
        <div className='letter'>
          {String.fromCharCode(idx + 65)}
        </div>
      </div>
      {text}
    </button>
  );
}
