import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// import { SignUp, SignIn, ResetPassword } from '../components/Auth';
import { Navbar } from "../components/Navbar";
import { Home, Login, Dashboard } from "../components/Dashboard";
import Survey from "../components/Question/Survey";

const ProtectedRoutes = ({ apartments, getApartment, getSlug, stringToSlug, slugToString }) => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home
            apartments={apartments}
            stringToSlug={stringToSlug}
          />
        </Route>
        <Route path="/login/:aptName">
          <Login
            getSlug={getSlug}
            slugToString={slugToString}
          />
        </Route>
        <Route path="/portal/:aptName">
          <Dashboard
            getApartment={getApartment}
            getSlug={getSlug}
          />
        </Route>
        <Route path="/survey/:aptName">
          <Survey
            getApartment={getApartment}
            getSlug={getSlug}
          />
        </Route>
        <Redirect from='*' to='/' />
      </Switch>
    </>
  );
};

export default ProtectedRoutes;
