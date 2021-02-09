import React, { useState, useEffect } from 'react';
import "./dashboard.css";

export default function Home({ apartments, stringToSlug }) {
  // TODO: Change to backend image
  // const [apartments] = useState([
  //   {
  //     id: 4,
  //     aptName: 'The George',
  //     image: 'https://www.sinologyinstitute.com/sites/default/files/styles/adaptive/public/crappy_apartment.jpg?itok=H-khIx3_',
  //   },
  //   {
  //     id: 1,
  //     aptName: 'The Yard',
  //     image: 'https://photos.zillowstatic.com/fp/f675a3f5ab964e2441d24672fd1cc615-p_e.jpg',
  //   },
  //   {
  //     id: 2,
  //     aptName: 'Zaragon West',
  //     image: 'https://www.inquirer.com/resizer/ghiY9toogNNUYZR4OTNVpUzFw8I=/1400x932/smart/arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/XSQXOE3UTNH6DNF4ZAFCG5DTJA.jpg',
  //   },
  //   {
  //     id: 3,
  //     aptName: 'Zaragon East',
  //     image: 'https://i.pinimg.com/originals/07/da/21/07da216e4b1d9fe8f271edf4a3d59952.jpg',
  //   },
  //   {
  //     id: 5,
  //     aptName: 'University Towers',
  //     image: 'https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.nj.com/home/njo-media/width2048/img/entertainment_impact/photo/csm1016-oceanave-s010-ext-hero-dusk-final2000jpg-d3e3b1df09bff4be.jpg',
  //   },
  //   {
  //     id: 6,
  //     aptName: 'Forest Place',
  //     image: 'https://i.pinimg.com/originals/06/bb/48/06bb486485d776d691935993e7421313.jpg',
  //   },
  //   {
  //     id: 7,
  //     aptName: 'Oxford Housing',
  //     image: 'https://www.rent.com.au/blog/wp-content/uploads/2020/01/20200204-Terrible-Property.png',
  //   },
  // ]);

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
