import React from 'react';

import data from './data';
import { FooterBox } from './styles';

const Footer = () => {
  const {
    logo, phone, email, address, zipCode,
  } = data.footer;
  return (
    <FooterBox className="row d-flex align-items-center">
      <div className="col-xl">
        <img src={logo} alt="Logo Petrol Group" />
      </div>
      <div className="col-xl text-center">
        <small>
          <div>{phone}</div>
          <div>{email}</div>
        </small>
      </div>
      <div className="col-xl text-right">
        <small>
          <div>{address}</div>
          <div>CEP: {zipCode}</div>
        </small>
      </div>
    </FooterBox>
  );
};

export default Footer;
