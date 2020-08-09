import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Views
import { SignUp, SignIn, ResetPassword} from '../components/Auth';
import {AuthNavbar} from "../components/Navbar"

const AuthRoutes = () => (
  <>
  <AuthNavbar />
  <Switch>
    <Route path="/signup">
      <SignUp />
    </Route>
    <Route path="/signin">
      <SignIn />
    </Route>
    <Route path="/resetpassword">
      <ResetPassword />
    </Route>
    <Route path="/" exact>
      <SignIn />
    </Route>
  </Switch>
  </>
);

export default AuthRoutes;
