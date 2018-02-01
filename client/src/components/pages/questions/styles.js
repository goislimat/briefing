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
