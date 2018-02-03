import styled from 'styled-components';

import color from '../../../styles/colors';
import BaseButton from '../../../styles/BaseButton';

export const CardGutter = styled.div`
  padding: 20px 30px;
`;

export const Card = styled.div`
  background-color: ${color.white()};
  padding: 30px;
  .question {
    font-size: 1.1rem;
    font-weight: bold;
    padding-left: 45px;
  }
`;

export const Button = BaseButton.extend`
  &.move {
    background-color: transparent;
    border: 0;
    color: #ddd;
    cursor: move;
    padding: 5px 20px 20px 20px;
  }
  &.edit {
    background-color: ${color.menuDarkGray()};
    border: 0;
    color: ${color.white()};
    padding: 0;
    height: 45px;
    width: 45px;
  }
  &.delete {
    background-color: ${color.red()};
    border: 0;
    color: ${color.white()};
    padding: 0;
    height: 45px;
    width: 45px;
  }
  &.more-info {
    background-color: transparent;
    border: 2px solid #ddd;
    color: #ddd;
    width: 100%;
    &:hover {
      border: 2px solid ${color.orange()};
      color: ${color.orange()};
    }
  }
`;

export const FieldRow = styled.div`
  margin: 0;
  input[type='text'],
  textarea {
    border: 0;
    outline: 0;
    resize: none;
    &.pergunta {
      font-size: 1.1rem;
      font-weight: bold;
    }
    &:disabled {
      background-color: transparent;
    }
  }
  input[type='checkbox'],
  input[type='radio'] {
    display: none;
  }
`;

export const StyledCheckbox = styled.div.attrs({
  color: props => (props.checked ? color.green() : color.red()),
})`
  border: 2px solid transparent;
  cursor: ${props => (props.disabled ? 'text' : 'pointer')};
  margin-bottom: 10px;
  padding: 5px 20px;
  transition: all 0.5s;
  &:hover {
    border: ${props => (props.disabled ? '2px solid transparent' : `2px solid ${props.color}`)};
  }
  .checkstatus {
    color: ${props => (props.disabled ? 'inherit' : props.color)};
    font-weight: bolder;
  }
`;

export const TextForRadio = styled.div`
  margin-bottom: 20px;
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
