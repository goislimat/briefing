import React from 'react';
import PropTypes from 'prop-types';

import { SupportSection, LoginButton } from './styles';

const LoginFormActions = ({ isSubmitting, isValid }) => (
  <SupportSection className="submit-and-support col-xl-12 row form-group">
    <div className="support-message col-xl-6 text-left">
      <small>
        <p>Não está conseguindo logar?</p>
        <p>
          Entre em contato conosco <a href="#">aqui</a>
        </p>
      </small>
    </div>
    <LoginButton
      rounded
      className="col-xl-auto"
      disabled={isSubmitting || !isValid}
      title={isSubmitting || !isValid ? 'Preencha o form para logar' : ''}
    >
      Entrar
    </LoginButton>
  </SupportSection>
);

export default LoginFormActions;

LoginFormActions.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};
