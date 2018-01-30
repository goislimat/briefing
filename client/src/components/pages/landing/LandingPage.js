import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { isAuthenticated } = this.props;

    return (
      <Main className="h100">
        <LandingBody />
        <Footer />
        <GuestRoute isAuthenticated={isAuthenticated} path="/acesso" component={AuthPage} />
        <GuestRoute isAuthenticated={isAuthenticated} path="/cadastro" component={AuthPage} />
      </Main>
    );
  }
}

export default LandingPage;

LandingPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
