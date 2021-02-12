import React from 'react';

export default function Badge({ number, text }) {
  return (
    <div className='center dashboard-badge'>
      <strong>{number} {text}</strong>
    </div>
  )
}
