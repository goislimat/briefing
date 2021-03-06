import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const GuestRoute = ({
  isAuthenticated, isAdmin, component: Component, ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      (!isAuthenticated ? (
        <Component isAuthenticated={isAuthenticated} isAdmin={isAdmin} {...props} />
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
  isAdmin: PropTypes.bool.isRequired,
};
