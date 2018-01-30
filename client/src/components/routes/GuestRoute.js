import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (!isAuthenticated ? (
        <Component isAuthenticated={isAuthenticated} {...props} />
      ) : (
        <Redirect to="/dashboard" />
      ))
    }
  />
);

export default GuestRoute;

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
