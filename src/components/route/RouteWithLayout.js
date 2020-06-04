import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

export default function RouteWithLayout(props) {
  const { layout: Layout, component: Component, ...rest } = props;

  ReactGA.initialize('UA-168559240-1');
  ReactGA.set({ page: window.location.pathname }); // Update the user's current page
  ReactGA.pageview(window.location.pathname); // Record a pageview for the given page

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};
