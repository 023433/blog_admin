import React from 'react';
import { BrowserRouter as   Switch, Redirect } from 'react-router-dom';
import MainLayout from '../layout/main/Main';

import DashboardView from '../views/Dashboard';
import PostView from '../views/post/Post';
import PropTypes from 'prop-types';

import RouteWithLayout from '../components/route/RouteWithLayout';

export default function Main() {

  return (
      <Switch>
        <Redirect exact from="/" to="/dashboard"/>
        <Route path="/dashboard" component={DashboardView}/>
        <Route path="/post" component={PostView}/>
      </Switch>
  );
}

const Route = props => {
  const { path, component } = props;

  return (
    <RouteWithLayout
      component={component}
      exact
      layout={MainLayout}
      path={path}
    />
  )
}

Route.propTypes = {
  path: PropTypes.string.isRequired, 
  component: PropTypes.elementType.isRequired
};

