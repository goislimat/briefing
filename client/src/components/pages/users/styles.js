import styled from 'styled-components';

import color from '../../styles/colors';
import BaseButton from '../../styles/BaseButton';

export const Button = BaseButton.extend`
  background-color: ${color.green()};
  border: 2px solid ${color.green()};
  color: ${color.white()};
  &:hover {
    background-color: transparent;
    color: ${color.green()};
  }
`;

export const CardGutter = styled.div`
  padding: 20px;
  &.blank {
    display: none;
  }
`;

export const Card = styled.div`
  background-color: ${color.white()};
  border-left: 5px solid ${props => color[props.cardColor]()};
  min-height: 120px;
  padding: 0;
  transition: all 0.5s;
  .image {
    background-color: #ccc;
    min-height: 140px;
    width: 110px;
  }
  .company {
    color: ${props => color[props.cardColor]()};
    font-size: 1.2rem;
    font-weight: bold;
  }
  &:hover {
    box-shadow: 0 0 30px #676767;
  }
`;

export const CardButton = BaseButton.extend.attrs({
  bgcolor: (props) => {
    if (props.delete) return color.red();
    if (props.save) return color.green();
    return color.menuDarkGray();
  },
})`
  background-color: #ccc;
  border: 1px solid ${color.white()};
  color: ${color.white()};
  cursor: ${props => (props.move ? 'move' : 'pointer')};
  padding: 10px;
  width: 45px;
  transition: all 0.5s;
  ${Card}:hover & {
    background-color: ${props => props.bgcolor};
  }
`;

export const UserInput = styled.input`
  border: 0;
  margin-bottom: 5px;
  outline: 0;
  width: 100%;
`;
