import React from 'react';
import { BrowserRouter as  Route, Switch, Redirect } from 'react-router-dom';
import MainLayout from '../layout/main/Main';

import DashboardView from '../views/Dashboard';
import PostView from '../views/post/Post';

import RouteWithLayout from '../components/route/RouteWithLayout';

export default function Main() {

  return (
      <Switch>
        <Redirect
          exact
          from="/"
          to="/dashboard"
        />
        <RouteWithLayout
          component={DashboardView}
          exact
          layout={MainLayout}
          path="/dashboard"
        />
        <RouteWithLayout
          component={PostView}
          exact
          layout={MainLayout}
          path="/post"
        />
        <Route exact path="/*">22</Route>
      </Switch>
  );
}


