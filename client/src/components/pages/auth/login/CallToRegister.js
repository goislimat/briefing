import React from 'react';
import { Link } from 'react-router-dom';

import { ImageCTA, ImageCTAButton } from '../styles';

const callToRegister = () => (
  <ImageCTA className="signup-cta col-xl-12">
    <p>Cadastre sua senha aqui</p>
    <Link to="/cadastro">
      <ImageCTAButton>Cadastrar</ImageCTAButton>
    </Link>
  </ImageCTA>
);

export default callToRegister;
