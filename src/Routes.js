import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Main from './route/Main';
import Sign from './route/Sign';

export default function Routes(props) {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/sign*"><Sign/></Route>
        <Route exact path="/*"><Main/></Route>
      </Switch>
    </Router>
  );
}


const ScrollToTop = withRouter(
  ({ history }) => {
    useEffect(() => {
      const unlisten = history.listen(() => {
        window.scrollTo(0, 0);
      });
      return () => {
        unlisten();
      }
    });
  
    return (null);
  }
);