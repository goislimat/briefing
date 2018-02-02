import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import { graphql } from 'react-apollo';

import history from '../history';
import UserRoute from './routes/UserRoute';

import UserQuery from '../queries/User';

import Loader from './styles/Loader';

import LandingPage from './pages/landing/LandingPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import NotFoundPage from './pages/notFound/NotFound';

const App = ({ data: { loading, isAuthenticated } }) => {
  if (loading) return <Loader />;

  return (
    <div className="container-fluid h100">
      <Router history={history}>
        {!loading && (
          <div className="h100">
            <Switch>
              <UserRoute
                isAuthenticated={isAuthenticated}
                path="/dashboard"
                component={DashboardPage}
              />
              {history.location.pathname !== '/' &&
                history.location.pathname !== '/acesso' &&
                history.location.pathname !== '/cadastro' && <Route component={NotFoundPage} />}
              <Route
                path="/"
                render={props => <LandingPage isAuthenticated={isAuthenticated} {...props} />}
              />
            </Switch>
          </div>
        )}
      </Router>
    </div>
  );
};

export default graphql(UserQuery.isAuthenticated)(App);

App.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
  }).isRequired,
};
