import React, { useState } from 'react';

// Material-UI Imports
import Popover from '@material-ui/core/Popover';

// Props:
//  aptName = apartment name
//  employees = list of employees for this group
//  route = Staff or Maintenance to specify POST request for new employee
export default function StaffFeedback({ aptName, employees, route }) {
  // Popup for adding new employee true or false
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="dashboard-staff-container">
      <div className='float-left'>
        <input
          type='search'
          placeholder=' 🔍  Search by employee name'
          autocomplete

        />
      </div>
      <div className='float-right'>
        <button
          id='add-btn'
          onClick={(e) => { setAnchorEl(e.currentTarget); }}
        >
          + Add New Employee
        </button>
        <Popover
          id="add-btn"
          open={open}
          anchorEl={anchorEl}
          onClose={() => { setAnchorEl(null); }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Form setAnchorEl={setAnchorEl} />
        </Popover>
      </div>
      <br />
      <br />
      <div className='employees'>
        {employees.map((employee) => {
          return (
            <Employee key={employee.id} name={employee.name} />
          );
        })}
      </div>
    </div>
  );
}

function Employee({ name }) {
  // Create URL to see this employee's feedback
  function createURL() {
    const url = window.location.href;
    const slug = name.trim().toLowerCase().replace(/ /g,"-");
    window.open(`${url}/${slug}`, '_self');
  }

  return (
    <div
      className='employee'
      onClick={createURL}
    >
      {name}
    </div>
  );
}

// Form to add new employee
function Form({ setAnchorEl }) {
  // Validate form & make POST request to create new employee
  function handleFormSubmit() {
    // TODO: Validate form
    // Refresh page to get updated list of employees
    window.location.reload(false);
  }

  function handleFormCancel() {
    setAnchorEl(null);
  }

  return (
    <div className='center dashboard-staff-form'>
      <h3>Create employee</h3>
      <form onSubmit={handleFormSubmit} onReset={handleFormCancel}>
        <input type='text' placeholder=' Full name' /><br />
        <input type='text' placeholder=' Phone number' /><br />
        <input type='email' placeholder=' Email address' /><br />
        <input type='submit' value='Submit' />
        <input type='reset' value='Cancel' />
      </form>
    </div>
  );
}
