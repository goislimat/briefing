import React from 'react';
import PropTypes from 'prop-types';

import petrolDesign from '../../../images/icons/petrol-design-02.png';

import { Overlay, CloseIcon, LoginFormArea, LoginImageDiv, SkewedDiv } from './styles';
import AuthForm from './AuthForm';

import CallToRegister from './login/CallToRegister';
import LoginHeader from './login/LoginHeader';
import CallToLogin from './signup/CallToLogin';
import SignupHeader from './signup/SignupHeader';

class AuthPage extends React.Component {
  componentDidMount() {
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') this.returnToRoot();
    });
  }

  returnToRoot = () => {
    this.props.history.push('/');
  };

  render() {
    const { pathname } = this.props.location;

    return (
      <Overlay>
        <CloseIcon className="close">
          <i className="fa fa-times" aria-hidden="true" onClick={this.returnToRoot} />
        </CloseIcon>
        <LoginFormArea className="holder row">
          <LoginImageDiv className="col-xl-6">
            <div className="gradient row d-flex align-content-between flex-wrap">
              <div className="col-xl-12">
                <img src={petrolDesign} alt="Petrol Design 02" />
              </div>
              {pathname === '/acesso' && <CallToRegister />}
              {pathname === '/cadastro' && <CallToLogin />}
            </div>
          </LoginImageDiv>
          <SkewedDiv className="col-xl-6 row d-flex align-content-around flex-wrap">
            {pathname === '/acesso' && <LoginHeader />}
            {pathname === '/cadastro' && <SignupHeader />}
            <AuthForm />
          </SkewedDiv>
        </LoginFormArea>
      </Overlay>
    );
  }
}

export default AuthPage;

AuthPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
