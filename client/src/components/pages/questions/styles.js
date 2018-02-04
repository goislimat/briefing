import styled from 'styled-components';

import color from '../../styles/colors';
import BaseButton from '../../styles/BaseButton';

// Cards
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

// Buttons
export const AddQuestionButton = BaseButton.extend`
  background-color: ${color.green()};
  border: 2px solid ${color.green()};
  color: ${color.white()};
  &:hover {
    background-color: transparent;
    color: ${color.green()};
  }
`;

export const SortingButton = BaseButton.extend`
  background-color: ${color.orange()};
  border: 2px solid ${color.orange()};
  color: ${color.white()};
  margin-right: 50px;
  &:enabled {
    &:hover {
      background-color: transparent;
      color: ${color.orange()};
    }
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

export const SaveButton = BaseButton.extend`
  background-color: ${color.petrol()};
  border: 2px solid ${color.petrol()};
  color: ${color.white()};
  width: 100%;
  &:enabled {
    &:hover {
      background-color: transparent;
      color: ${color.petrol()};
    }
  }
`;

const ActionButton = BaseButton.extend`
  color: ${color.white()};
  height: 45px;
  width: 45px;
  margin-top: 20px;
  padding: 0;
  &:enabled {
    &:hover {
      background-color: transparent;
    }
  }
`;

export const EditButton = ActionButton.extend`
  background-color: ${color.orange()};
  border: 2px solid ${color.orange()};
  &:enabled {
    &:hover {
      color: ${color.orange()};
    }
  }
`;

export const BackButton = ActionButton.extend`
  background-color: ${color.petrol()};
  border: 2px solid ${color.petrol()};
  &:enabled {
    &:hover {
      color: ${color.petrol()};
    }
  }
`;

export const DeleteButton = ActionButton.extend`
  background-color: ${color.red()};
  border: 2px solid ${color.red()};
  &:enabled {
    &:hover {
      color: ${color.red()};
    }
  }
  &.option {
    margin: 0;
  }
`;

export const AddOptionButton = ActionButton.extend`
  background-color: ${color.blue()};
  border: 2px solid ${color.blue()};
  margin: 0;
  &:enabled {
    &:hover {
      color: ${color.blue()};
    }
  }
`;

// Inputs
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
    color: ${props => props.color};
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
    cursor: pointer;
  }
`;

// Divs
export const OptionDiv = styled.div`
  margin: 10px 0;
`;
