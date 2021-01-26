import React from 'react';
import './question.css';

export default function Badges({ badges }) {
  return (
    <div className='badges'>
      <form>
        {badges.map((badge, idx) => {
          return (
            <>
              <input type='checkbox' id={badge.text + idx} />
              <label for={badge.text + idx}>
                <h5><span></span> {badge.text}</h5>
              </label>
            </>
          );
        })}
      </form>
    </div>
  );
}
