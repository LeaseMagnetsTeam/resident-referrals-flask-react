import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { SignUp, SignIn, ResetPassword} from '../components/Auth';
import {ProtectedNavbar} from "../components/Navbar"

const ProtectedRoutes = () => {
  return (
    <>
    <ProtectedNavbar />
    <Switch>
      <Route path="/" exact>
        Account homepage
      </Route>
      <Route path="/signout">
        Signout
      </Route>
    </Switch>
    </>
  );
};

export default ProtectedRoutes;
