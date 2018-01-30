import React from 'react';

import { LoginTitle, LoginMessage } from '../styles';

const LoginHeader = () => (
  <div className="col-xl-12 row d-flex flex-column">
    <LoginTitle className="d-flex justify-content-end">Login</LoginTitle>
    <LoginMessage className="d-flex justify-content-end subtitle">
      <small>
        Se você já cadastrou sua senha ao lado,<br />é hora de começar!
      </small>
    </LoginMessage>
  </div>
);

export default LoginHeader;
