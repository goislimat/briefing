import styled from 'styled-components';

import color from '../../styles/colors';
import BaseContainer from '../../styles/Container';
import BaseButton from '../../styles/BaseButton';

const randomColor = () => {
  // eslint-disable-next-line no-mixed-operators
  switch (Math.floor(Math.random() * 4 + 1)) {
    case 1:
      return color.menuDarkGray();
    case 2:
      return color.blue();
    case 3:
      return color.orange();
    default:
      return color.menuLightGray();
  }
};

export const Container = BaseContainer.extend`
  height: 100%;
  h2 {
    margin-top: 50px;
    &,
    h4 {
      color: ${color.menuLightGray()};
      text-transform: uppercase;
    }
  }
`;

export const CardGutter = styled.div`
  padding: 20px;
  &.from-dashboard {
    background-color: ${color.orange()};
  }
`;

export const Card = styled.div`
  background-color: ${color.white()};
  padding: 45px 20px;
  min-height: 300px;
  transition: all 0.5s;
  a {
    color: ${color.menuDarkGray()};
    text-decoration: none;
    transition: all 0.5s;
  }
  h4 {
    margin-bottom: 20px;
    text-align: center;
    text-transform: uppercase;
  }
  .fa-plus-circle {
    font-size: 5rem;
  }
  &.effect:hover {
    background-color: ${randomColor()};
    box-shadow: 0 0 30px #aaa;
    color: ${color.white()};
    a {
      cursor: pointer;
      color: ${color.white()};
    }
  }
`;

export const Actions = styled.div`
  opacity: 1;
  position: absolute;
  top: 30px;
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

export const FormGroup = styled.div`
  input,
  textarea {
    border: 0;
    outline: 0;
    margin-bottom: 10px;
    &.title {
      font-weight: bold;
    }
    &:focus {
      border-left: 2px solid ${color.menuDarkGray()};
    }
  }
  small {
    color: #bbb;
  }
`;

export const SaveButton = BaseButton.extend`
  background-color: ${color.petrol()};
  border: 2px solid ${color.petrol()};
  color: ${color.white()};
  margin-top: 40px;
  width: 100%;
  &:enabled {
    &:hover {
      background-color: transparent;
      color: ${color.petrol()};
    }
  }
`;

export const BackButton = BaseButton.extend`
  background-color: ${color.white()};
  border: 2px solid ${color.white()};
  color: #ddd;
  margin-bottom: 20px;
  padding: 0;
  &:enabled {
    &:hover {
      i {
        font-weight: bold;
      }
    }
  }
`;

export const AddButton = BaseButton.extend`
  background-color: transparent;
  border: 0;
  ${Card}:hover & {
    color: ${color.white()};
  }
`;
