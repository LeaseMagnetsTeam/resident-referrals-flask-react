import React, { useState } from 'react';

import HOST from '../../utils/request.js';

// Material-UI Imports
import Popover from '@material-ui/core/Popover';

// Props:
//  aptName = apartment name
//  employees = list of employees for this group
//  route = Staff or Maintenance to specify POST request for new employee
export default function StaffFeedback({ aptName, employees, route }) {
  const [tempEmps, setTempEmps] = useState(employees);
  // Popup for adding new employee true or false
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'add-btn' : undefined;

  // Handle user search
  function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    console.log("Looking for", query);

    // Filter all apts that contain "query"
    const temp = employees.filter((emp) => emp.name.toLowerCase().includes(query));
    // Put results in tempApts
    setTempEmps(temp);
  }

  // Create new employee
  function createEmployee(name, phone, email) {
    const data = {
      name: name,
      phoneNumber: phone,
      email: email,
      role: route,
      apartment: aptName
    };

    // POST User to backend
    fetch(`${HOST}/users`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        // Refresh page to get updated list of employees
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div className="dashboard-staff-container">
      <div className='float-left'>
        <input
          type='search'
          placeholder=' 🔍  Search by employee name'
          autocomplete
          onChange={handleSearch}
        />
      </div>
      <div className='float-right'>
        <button
          id={id}
          onClick={(e) => { setAnchorEl(e.currentTarget); }}
        >
          + Add New Employee
        </button>
        <Popover
          id={id}
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
          <Form
            setAnchorEl={setAnchorEl}
            createEmployee={createEmployee}
          />
        </Popover>
      </div>
      <br />
      <br />
      {(employees.length > 0) ?
        <div className='employees'>
          {(tempEmps) && tempEmps.map((employee) => {
            return (
              <Employee
                key={employee.id}
                id={employee.id}
                name={employee.name}
              />
            );
          })}
          {(tempEmps.length === 0) && employees.map((employee) => {
            return (
              <Employee
                key={employee.id}
                id={employee.id}
                name={employee.name}
              />
            );
          })}
        </div>
        :
        <div className='no-employees center-div'>
          No employees found
        </div>
      }
    </div>
  );
}

function Employee({ id, name }) {
  // Create URL to see this employee's feedback
  function createURL() {
    const url = window.location.href;
    window.open(`${url}/${id}`, '_self');
  }

  return (
    <div className='employee' onClick={createURL}>
      {name}
    </div>
  );
}

// Form to add new employee
function Form({ setAnchorEl, createEmployee }) {
  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Validate form & make POST request to create new employee
  function handleFormSubmit(event) {
    event.preventDefault();
    // TODO: Validate form

    // POST to Users route
    createEmployee(name, phone, email);
  }

  function handleFormCancel() {
    setAnchorEl(null);
  }

  return (
    <div className='center dashboard-staff-form'>
      <h3>Create employee</h3>
      <form onSubmit={handleFormSubmit} onReset={handleFormCancel}>
        <input
          type='text'
          placeholder=' Full name'
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type='text'
          placeholder=' Phone number'
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <input
          type='email'
          placeholder=' Email address'
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input type='submit' value='Submit' />
        <input type='reset' value='Cancel' />
      </form>
    </div>
  );
}
