import styled from 'styled-components';

import color from '../../../styles/colors';
import BaseButton from '../../../styles/BaseButton';

export const CardGutter = styled.div`
  padding: 20px 30px;
`;

export const Card = styled.div`
  background-color: ${color.white()};
  padding: 30px;
`;

export const CardInfo = styled.div`
  .question {
    font-size: 1.1rem;
    font-weight: bold;
  }
  small {
    color: #bbb;
  }
  ul {
    list-style-type: none;
    span {
      color: #ddd;
      font-weight: bold;
    }
  }
`;

export const CardFormInfo = styled.div`
  small {
    color: #bbb;
  }
  input[type='text'],
  textarea {
    border: 1px solid #eee;
    outline: 0;
    &.question {
      font-size: 1.1rem;
      font-weight: bold;
    }
  }
  input[type='checkbox'],
  input[type='radio'] {
    display: none;
  }
`;

export const MoreInfoButton = BaseButton.extend`
  background-color: transparent;
  border: 2px solid #ddd;
  color: #ddd;
  width: 100%;
  &:hover {
    border: 2px solid ${color.orange()};
    color: ${color.orange()};
  }
`;

export const MoveButton = BaseButton.extend`
  background-color: transparent;
  border: 0;
  color: #ddd;
  cursor: move;
  padding: 5px 20px 20px 20px;
`;

const ActionButton = BaseButton.extend`
  color: ${color.white()};
  height: 45px;
  width: 45px;
  margin-top: 20px;
  padding: 0;
  &:hover {
    background-color: transparent;
  }
`;

export const EditButton = ActionButton.extend`
  background-color: ${color.orange()};
  border: 2px solid ${color.orange()};
  &:hover {
    color: ${color.orange()};
  }
`;

export const BackButton = ActionButton.extend`
  background-color: ${color.petrol()};
  border: 2px solid ${color.petrol()};
  &:hover {
    color: ${color.petrol()};
  }
`;

export const DeleteButton = ActionButton.extend`
  background-color: ${color.red()};
  border: 2px solid ${color.red()};
  &:hover {
    color: ${color.red()};
  }
`;

export const SaveButton = BaseButton.extend`
  background-color: ${color.petrol()};
  border: 2px solid ${color.petrol()};
  color: ${color.white()};
  width: 100%;
  &:hover {
    background-color: transparent;
    color: ${color.petrol()};
  }
`;

export const StyledCheckbox = styled.div.attrs({
  color: props => (props.checked ? color.green() : color.red()),
})`
  border-left: 2px solid transparent;
  cursor: pointer;
  margin-bottom: 10px;
  padding: 5px 20px;
  transition: all 0.5s;
  &:hover {
    border-left: 2px solid ${props => props.color};
  }
  .checkstatus {
    color: ${props => (props.disabled ? 'inherit' : props.color)};
    font-weight: bolder;
  }
`;

export const StyledRadio = styled.div.attrs({
  color: props => (props.checked ? color.menuDarkGray() : color.bodyGray()),
})`
  border: 2px solid ${props => props.color};
  color: ${props => props.color};
  font-weight: bold;
  margin-bottom: 20px;
  padding: 5px 20px;
  transition: all 0.5s;
  &:hover {
    border: 2px solid ${props => props.color};
    cursor: ${props => (props.disabled ? 'text' : 'pointer')};
  }
`;
