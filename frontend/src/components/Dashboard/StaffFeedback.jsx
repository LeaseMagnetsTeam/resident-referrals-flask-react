import React from 'react';

// Props:
//  aptName = apartment name
//  employees = list of employees for this group
//  route = Staff or Maintenance to specify POST request for new employee
export default function StaffFeedback({ aptName, employees, route }) {
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
        <button>+ Add New Employee</button>
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
