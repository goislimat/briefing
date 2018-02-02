import React from 'react';
import styled, { keyframes } from 'styled-components';

import color from './colors';

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

const LoaderComponent = styled.div`
  border: 8px solid ${color.menuDarkGray()};
  border-radius: 50%;
  border-top: 8px solid ${color.orange()};
  width: 60px;
  height: 60px;
  animation: ${rotate} 0.5s linear infinite;
`;

const Loader = () => (
  <div className="h100 d-flex justify-content-center align-items-center">
    <LoaderComponent />
  </div>
);

export default Loader;
