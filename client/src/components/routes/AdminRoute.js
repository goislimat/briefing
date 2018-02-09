import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const AdminRoute = ({
  isAuthenticated, isAdmin, component: Component, ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated && isAdmin ? (
        <Component isAuthenticated={isAuthenticated} isAdmin={isAdmin} {...props} />
      ) : (
        <Redirect to="/dashboard" />
      ))
    }
  />
);

export default AdminRoute;

AdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};
