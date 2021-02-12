import React from 'react';
import Banner from './Banner';
import './question.css';

export default function Question({ setRoute, apt_template, question_template, setWho }) {
  return (
    <div>
      <Banner name={apt_template.aptName} image={"https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.nj.com/home/njo-media/width2048/img/entertainment_impact/photo/csm1016-oceanave-s010-ext-hero-dusk-final2000jpg-d3e3b1df09bff4be.jpg"} />
      <h1 className='question-text'>
        {question_template.question} {apt_template.aptName}?
      </h1>
      {question_template.answers.map((answer, idx) => {
        return (
          <Answer
            key={answer.id}
            id={answer.id}
            setWho={setWho}
            setRoute={setRoute}
            idx={idx}
            text={answer.text}
            nextURL={answer.nextURL}
          />
        );
      })}
    </div>
  );
}

// Answer button
function Answer({ id, setWho, setRoute, idx, text, nextURL }) {
  // Handle button click
  function handleClick() {
    setRoute(nextURL);
    // If this question is asking for who the user interacted with
    if (setWho) setWho({name: text, user_id: id});
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
