import React, { useState, useEffect } from 'react';
import "./dashboard.css";

export default function Home() {
  // TODO: Get all of our apartments by GET request
  const [apts] = useState([
    {
      id: 4,
      aptName: 'The George'
    },
    {
      id: 1,
      aptName: 'The Yard'
    },
    {
      id: 2,
      aptName: 'Zaragon West'
    },
    {
      id: 3,
      aptName: 'Zaragon East'
    },
    {
      id: 5,
      aptName: 'University Towers'
    },
    {
      id: 6,
      aptName: 'Forest Place'
    },
    {
      id: 7,
      aptName: 'Oxford Housing'
    },
  ]);

  const [tempApts, setTempApts] = useState(apts);

  // Sort apts by alphabetical order
  function sortApts() {
    console.log("sort apts");
    const temp = [...tempApts];

    // Sort by aptName
    temp.sort((a, b) => (a.aptName > b.aptName) ? 1 : -1);

    setTempApts(temp);
  }

  // Handle user search
  function handleSearch(event) {
    // Get query
    const query = event.target.value.toLowerCase();
    console.log("Looking for", query);

    // Filter all apts that contain "query"
    const temp = apts.filter((apt) => apt.aptName.toLowerCase().includes(query));
    // Put results in tempApts
    setTempApts(temp);
  }

  useEffect(() => {
    sortApts();
  }, []);

  return (
    <div className="admin-container">
      <input
        type='search'
        placeholder=' 🔍  Search by apartment name'
        autocomplete
        onChange={handleSearch}
      />
      <div className="admin-card-container">
        {tempApts.map((apt) => {
          return (
            <Card id={apt.id} aptName={apt.aptName} />
          );
        })}
      </div>
    </div>
  );
}

// Component for each apartment icon on home page
function Card({ id, aptName }) {
  // TODO: Change to backend image
  const image = 'https://photos.zillowstatic.com/fp/f675a3f5ab964e2441d24672fd1cc615-p_e.jpg';
  return (
    <div
      style={{background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${image}) no-repeat center`}}
      className='admin-container-card'
    >
      <h2>{aptName}</h2>
    </div>
  );
}
