import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';

// Files and Helpers
import gasStationMockup from '../../../images/gas-station-mockup.png';

// Components
import { Main } from './styles';
import LandingBody from './LandingBody';
import Footer from './LandingFooter';

import GuestRoute from '../../routes/GuestRoute';

import AuthPage from '../auth/AuthPage';

class LandingPage extends Component {
  componentDidMount() {
    document.body.style.background = `url(${gasStationMockup})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
  }

  render() {
    const { isAuthenticated, isAdmin } = this.props;

    return (
      <Main className="h100">
        <LandingBody />
        <Footer />
        <Switch>
          <GuestRoute
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            exact
            path="/acesso"
            component={AuthPage}
          />
          <GuestRoute
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            exact
            path="/cadastro"
            component={AuthPage}
          />
        </Switch>
      </Main>
    );
  }
}

export default LandingPage;

LandingPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};
