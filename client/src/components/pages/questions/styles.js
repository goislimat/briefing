import styled from 'styled-components';
import { Form } from 'formik';

import color from '../../styles/colors';
import BaseButton from '../../styles/BaseButton';

export const CardGutter = styled.div`
  padding: 20px;
`;

export const CardForm = styled(Form)`
  background-color: ${color.white()};
  border-left: 5px solid ${color.orange()};
  padding: 50px;
  .pergunta {
    font-size: 1.3rem;
    font-weight: bold;
  }
  input[type='text'],
  textarea {
    border: 0;
    outline: 0;
    resize: none;
    width: 100%;
  }
  input[type='checkbox'],
  input[type='radio'] {
    opacity: 0;
    display: none;
  }
`;

export const AddQuestionButton = BaseButton.extend`
  background-color: ${color.green()};
  border: 2px solid ${color.green()};
  color: ${color.white()};
  &:hover {
    background-color: transparent;
    color: ${color.green()};
  }
`;

export const SaveButton = BaseButton.extend`
  background-color: ${color.petrol()};
  border: 2px solid ${color.petrol()};
  color: ${color.white()};
  position: relative;
  top: 20px;
  left: 0px;
  width: 100%;
  &:hover {
    background-color: ${color.white()};
    color: ${color.petrol()};
  }
`;

export const StyledCheckbox = styled.div.attrs({
  color: props => (props.checked ? color.green() : color.red()),
})`
  border: 2px solid transparent;
  cursor: pointer;
  margin: 20px 0;
  padding: 5px 20px;
  transition: all 0.5s;
  &:hover {
    border: 2px solid ${props => props.color};
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
  cursor: pointer;
  margin-bottom: 20px;
  padding: 5px 20px;
  transition: all 0.5s;
  &:hover {
    border: 2px solid ${props => props.color};
  }
`;
