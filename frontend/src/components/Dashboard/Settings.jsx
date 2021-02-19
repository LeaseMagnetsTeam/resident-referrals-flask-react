import React, { useState, useRef } from 'react';

import HOST from '../../utils/request.js';

// Material-UI Imports
import Popover from '@material-ui/core/Popover';

export default function Settings({ apt_id, specialOffer, aptBadges, staffBadges }) {
  // Popup for open settings true or false
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'settings-form' : undefined;

  return (
    <div className='dashboard-settings'>
      <button
        id={id}
        onClick={(e) => { setAnchorEl(e.currentTarget); }}
      >
        {"⚙︎"}
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => { setAnchorEl(null); }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Form
          apt_id={apt_id}
          specialOffer={specialOffer}
          aptBadges={aptBadges}
          staffBadges={staffBadges}
          setAnchorEl={setAnchorEl}
        />
      </Popover>
    </div>
  );
}

function Form({ apt_id, specialOffer, aptBadges, staffBadges, setAnchorEl }) {
  const [offer, setOffer] = useState(specialOffer);
  const [newAptBadges, setNewAptBadges] = useState(aptBadges);
  const [newStaffBadges, setNewStaffBadges] = useState(staffBadges);

  // For form inputs
  const [newAptBadge, setNewAptBadge] = useState('');
  const [newStaffBadge, setNewStaffBadge] = useState('');

  // Clear form inputs
  const aptRef = useRef();
  const staffRef = useRef();

  // Form submit - PUT request to update special offer and badges
  function handleFormSubmit(e) {
    e.preventDefault();
    // Create json
    const data = {
      specialOffer: offer,
      aptBadges: {
        apt: newAptBadges,
        staff: newStaffBadges
      }
    };

    // PUT request to backend
    fetch(`${HOST}/apartments/${apt_id}`, {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
    // Close popup
    setAnchorEl(null);
    window.location.reload(true);
  }

  // Form cancel
  function handleFormCancel(e) {
    e.preventDefault();
    // reset to original passed in values
    setOffer(specialOffer);
    setNewAptBadges(aptBadges);
    setNewStaffBadges(staffBadges);
    // Close popup
    setAnchorEl(null);
  }

  // Handle minus button click
  function handleBadgeDelete(text, type) {
    if (type === 'apt') {
      const temp = newAptBadges.filter(badge => badge !== text);
      setNewAptBadges(temp);
    } else {
      const temp = newStaffBadges.filter(badge => badge !== text);
      setNewStaffBadges(temp);
    }
  }

  // Handle add button click
  function handleBadgeAdd(e, type) {
    e.preventDefault();
    if (type === 'apt') {
      const temp = [...newAptBadges];
      temp.push(newAptBadge);
      setNewAptBadges(temp);
      aptRef.current.value = null;
    } else {
      const temp = [...newStaffBadges];
      temp.push(newStaffBadge);
      setNewStaffBadges(temp);
      staffRef.current.value = null;
    }
  }

  return (
    <div className='dashboard-settings-form'>
      <h2 className='center'>Survey Settings</h2>
      <form onSubmit={handleFormSubmit} onReset={handleFormCancel}>
        <table>
          <tr>
            <td>
              <label>Special Offer:</label>
            </td>
            <td>
              <input
                type='text'
                defaultValue={offer}
                onChange={(e) => setOffer(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Apartment Badges:</label>
            </td>
            <td>
              <div className='badge-container'>
                {newAptBadges.map((badge) => {
                  return (
                    <BadgeRow
                      text={badge}
                      type={"apt"}
                      handler={handleBadgeDelete}
                    />
                  );
                })}
              </div>
              <input
                type='text'
                placeholder="New badge"
                ref={aptRef}
                onChange={(e) => setNewAptBadge(e.target.value)}
              />
              <button
                className='add'
                onClick={(e) => handleBadgeAdd(e, "apt")}
              >
                +
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>Staff Badges:</label>
            </td>
            <td>
              <div className='badge-container'>
                {newStaffBadges.map((badge) => {
                  return (
                    <BadgeRow
                      text={badge}
                      type={"staff"}
                      handler={handleBadgeDelete}
                    />
                  );
                })}
              </div>
              <input
                type='text'
                placeholder="New badge"
                ref={staffRef}
                onChange={(e) => setNewStaffBadge(e.target.value)}
              />
              <button
                className='add'
                onClick={(e) => handleBadgeAdd(e, "staff")}
              >
                +
              </button>
            </td>
          </tr>
          <tr>
            <td colspan="2" className='center'>
              <input type='submit' value='Save Changes' />
              <input type='reset' value='Cancel' />
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}

function BadgeRow({ text, type, handler }) {
  return (
    <p>
      <strong>
        {text}
      </strong>
      <button
        className='float-right'
        onClick={() => handler(text, type)}
      >
        −
      </button>
    </p>
  );
}
