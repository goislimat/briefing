import styled from 'styled-components';

import color from '../../styles/colors';
import BaseButton from '../../styles/BaseButton';

const randomColor = () => {
  // eslint-disable-next-line no-mixed-operators
  switch (Math.floor(Math.random() * 6 + 1)) {
    case 1:
      return color.menuDarkGray();
    case 2:
      return color.blue();
    case 3:
      return color.orange();
    case 4:
      return color.green();
    case 5:
      return color.red();
    default:
      return color.menuLightGray();
  }
};

export const CardGutter = styled.div`
  padding: 20px;
  a {
    text-decoration: none;
  }
`;

export const Card = styled.div`
  background-color: ${color.white()};
  color: ${color.menuDarkGray()};
  cursor: pointer;
  padding: 45px;
  height: 300px;
  transition: all 0.5s;
  h4 {
    margin-bottom: 20px;
    text-align: center;
    text-transform: uppercase;
  }
  .fa-plus-circle {
    font-size: 5rem;
  }
  &:hover {
    background-color: ${randomColor()};
    box-shadow: 0 0 30px #aaa;
    color: ${color.white()};
  }
`;

export const Actions = styled.div`
  opacity: 1;
  position: absolute;
  bottom: 30px;
  width: 75%;
  transition: all 0.5s;
`;

export const Button = BaseButton.extend`
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid transparent;
  color: ${color.white()};
  padding: 8px 0;
  &:hover {
    border-bottom: 2px solid white;
  }
`;
