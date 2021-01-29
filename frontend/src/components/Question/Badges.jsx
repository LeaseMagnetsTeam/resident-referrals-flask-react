import React from 'react';
import './question.css';

export default function Badges({ badges, selected, setSelected }) {
  // Add or delete badge from selected prop
  function modifySelected(event) {
    let temp = [...selected];
    // If badge becomes selected, add it to selected state
    if (event.target.checked) temp.push(event.target.id);
    // Badge becomes unselected, remove from selected state
    else temp = selected.filter(item => item !== event.target.id);

    // Set new state of selected prop
    setSelected(temp);
  }

  return (
    <div className='badges'>
      <form>
        {badges.map((badge) => {
          return (
            <>
              <input type='checkbox' id={badge.text} onClick={modifySelected} />
              <label htmlFor={badge.text} >
                <h5><span></span> {badge.text}</h5>
              </label>
            </>
          );
        })}
      </form>
    </div>
  );
}
