import React from 'react';

import { LoginTitle, LoginMessage } from '../styles';

const Signup = () => (
  <div className="col-xl-12 row d-flex flex-column">
    <LoginTitle className="d-flex justify-content-end">Cadastrar</LoginTitle>
    <LoginMessage className="d-flex justify-content-end">
      <small>Estamos quase lá!</small>
    </LoginMessage>
  </div>
);

export default Signup;
