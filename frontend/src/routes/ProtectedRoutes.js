import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import { SignUp, SignIn, ResetPassword } from '../components/Auth';
import { Navbar } from "../components/Navbar"
import Question from '../components/Question/Question';

const ProtectedRoutes = () => {
  return (
    <>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Question />
      </Route>
      <Route path="/signout">
        Signout
      </Route>
    </Switch>
    </>
  );
};

export default ProtectedRoutes;
