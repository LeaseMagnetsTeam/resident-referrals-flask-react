import React, { useState, useEffect } from 'react';
// import 'tabler-react/dist/Tabler.css';
import { Loader } from 'tabler-react';
import { BrowserRouter as Router } from 'react-router-dom';

import HOST from './utils/request.js';

// import ProtectedNavbar from './components/Navbar/ProtectedNavbar';

// import ResetPassword from './components/Auth/ResetPassword';

// Import Routes
// import AuthRoutes from './routes/AuthRoutes';
import ProtectedRoutes from './routes/ProtectedRoutes';


function App() {
  const [authIsUpToDate/*, setAuthIsUpToDate*/] = useState(true);
  // const [user/*, setUser*/] = useState(true);

  // useEffect(() => {
  //   firebase.auth.onAuthStateChanged((u) => {
  //     setUser(u);
  //     setAuthIsUpToDate(true);
  //   });
  // }, []);

  const [apartments, setApartments] = useState();

  // Get apt name slug
  function getSlug() {
    // Split URL by '/'
    const url = window.location.href.split('/');
    return url[url.length - 1];
  }

  // Convert given string into a url slug
  function stringToSlug(string) {
    return string.trim().toLowerCase().replace(/ /g,"-");
  }

  // Translate slug into a string with each first letter capitalized
  function slugToString(slug) {
    return slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
  }

  // Get apartment info using url slug
  function getApartment(setState, slug) {
    // fetch(`http://localhost:8080/apartments/${slug}`)
    fetch(`${HOST}/apartments/${slug}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setState(data.apartment);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // Get all apartments
  function getApartments() {
    //get(`/apartments/${slug}`, null)
    fetch(`${HOST}/apartments`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setApartments(data.apartments);
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  useEffect(() => {
    getApartments();
  }, []);

  return (
    <>
    {!authIsUpToDate ? (
      <div className="center-page">
        <Loader />
      </div>
    ) : (
      <div className="App">
        <Router>
          {(apartments) &&
            <ProtectedRoutes
              apartments={apartments}
              getApartment={getApartment}
              getSlug={getSlug}
              stringToSlug={stringToSlug}
              slugToString={slugToString}
            />
          }
          {/*user ?
            <ProtectedRoutes
              apartments={apartments}
              getApartment={getApartment}
              getSlug={getSlug}
              stringToSlug={stringToSlug}
              slugToString={slugToString}
            />
          :
            <AuthRoutes />
          */}
        </Router>
      </div>
    )}
    </>
  );
}

export default App;
