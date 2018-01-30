import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated ? (
        <Component isAuthenticated={isAuthenticated} {...props} />
      ) : (
        <Redirect to="/acesso" />
      ))
    }
  />
);

export default UserRoute;

UserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
