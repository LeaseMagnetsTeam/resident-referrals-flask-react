import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import { SignUp, SignIn, ResetPassword } from '../components/Auth';
import { Navbar } from "../components/Navbar"
import Question from '../components/Question/Question';

// Testing backend without backend server
import {
  apt_template,
  question_template,
  question_template1,
  question_template2,
  question_template3
} from '../components/Question/question.test.js';

const ProtectedRoutes = () => {
  return (
    <>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Question apt_template={apt_template} question_template={question_template} />
      </Route>
      <Route path="/toured-community" exact>
        <Question apt_template={apt_template} question_template={question_template3} />
      </Route>
      <Route path="/ask-review" exact>
        <Question apt_template={apt_template} question_template={question_template1} />
      </Route>
      <Route path="/ask-google-review" exact>
        <Question apt_template={apt_template} question_template={question_template2} />
      </Route>
    </Switch>
    </>
  );
};

export default ProtectedRoutes;
