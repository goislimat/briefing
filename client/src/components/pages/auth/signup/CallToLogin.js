import React from 'react';
import { Link } from 'react-router-dom';

import { ImageCTA, ImageCTAButton } from '../styles';

const callTologin = () => (
  <ImageCTA className="signup-cta col-xl-12">
    <p>Já se cadastrou?</p>
    <Link to="/acesso">
      <ImageCTAButton>Acessar</ImageCTAButton>
    </Link>
  </ImageCTA>
);

export default callTologin;
