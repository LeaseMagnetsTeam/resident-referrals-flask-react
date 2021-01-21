import React, { useState } from 'react';
// import { Switch, Route } from 'react-router-dom';

// import { SignUp, SignIn, ResetPassword } from '../components/Auth';
import { Navbar } from "../components/Navbar"
import { Question, Exit, SpecialOffer, Review } from '../components/Question';

// Testing backend without backend server
import {
  apt_template,
  question_template,
  question_template1,
  question_template3
} from '../components/Question/question.test.js';

const ProtectedRoutes = () => {
  // Track which route user is on
  const [route, setRoute] = useState('/');

  return (
    <>
      <Navbar />
      {(route === '/') &&
        <Question setRoute={setRoute} apt_template={apt_template} question_template={question_template} />
      }
      {(route === '/toured-community') &&
        <Question setRoute={setRoute} apt_template={apt_template} question_template={question_template3} />
      }
      {(route === '/ask-review') &&
        <Question setRoute={setRoute} apt_template={apt_template} question_template={question_template1} />
      }
      {(route === '/give-review') &&
        <Review setRoute={setRoute} apt_template={apt_template} />
      }
      {(route === '/special-offer') &&
        <SpecialOffer setRoute={setRoute} apt_template={apt_template} />
      }
      {(route === '/exit-page') &&
        <Exit apt_template={apt_template} />
      }
      {/*<Switch>
        <Route path="/" exact>
          <Question apt_template={apt_template} question_template={question_template} />
        </Route>
        <Route path="/toured-community" exact>
          <Question apt_template={apt_template} question_template={question_template3} />
        </Route>
        <Route path="/ask-review" exact>
          <Question apt_template={apt_template} question_template={question_template1} />
        </Route>
        <Route path="/give-review" exact>
          <Review apt_template={apt_template} />
        </Route>
        <Route path="/special-offer" exact>
          <SpecialOffer apt_template={apt_template} />
        </Route>
        <Route path="/exit-page" exact>
          <Exit apt_template={apt_template} />
        </Route>
      </Switch>*/}
    </>
  );
};

export default ProtectedRoutes;
