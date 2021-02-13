import React, { useState, useEffect } from 'react';
import "./dashboard.css";

export default function Home({ apartments, stringToSlug }) {
  // TODO: Change to backend image

  const [tempApts, setTempApts] = useState([]);

  // Sort apts by alphabetical order
  function sortApts() {
    const temp = [...apartments];

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
    const temp = apartments.filter((apt) => apt.aptName.toLowerCase().includes(query));
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
            <Card
              key={apt.id}
              aptName={apt.aptName}
              image={"https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.nj.com/home/njo-media/width2048/img/entertainment_impact/photo/csm1016-oceanave-s010-ext-hero-dusk-final2000jpg-d3e3b1df09bff4be.jpg"}
              createURL={stringToSlug}
            />
          );
        })}
      </div>
    </div>
  );
}

// Component for each apartment icon on home page
function Card({ id, aptName, image, createURL }) {
  // Open next route
  function handleClick() {
    window.open(`/login/${createURL(aptName)}`, '_self');
  }

  return (
    <div
      style={{background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${image}) no-repeat center`}}
      className='admin-container-card'
      onClick={handleClick}
    >
      <h2>{aptName}</h2>
    </div>
  );
}
