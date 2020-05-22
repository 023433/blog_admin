import React from 'react';
import { BrowserRouter as  Route, Switch } from 'react-router-dom';
import SignIn from '../views/sign/SignIn' ;
import SignUp from '../views/sign/SignUp' ;

export default function Sign() {

  return (
    <div style={{minHeight: "100vh"}}>
      <Switch>
        <Route exact path="/signin"><SignIn/></Route>
        <Route exact path="/signup"><SignUp/></Route>
      </Switch>
    </div>
  );
}


