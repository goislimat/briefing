import styled from 'styled-components';
import { Form } from 'formik';

import color from '../../../styles/colors';
import BaseButton from '../../../styles/BaseButton';

export const Title = styled.h2`
  color: ${color.blue()};
  text-transform: uppercase;
`;

export const StyledForm = styled(Form)`
  background-color: ${color.white()};
  margin-top: 30px;
  height: auto;
  padding: 50px;
  input[type='text'],
  textarea {
    border: 0;
    border-left: 5px solid transparent;
    outline: 0;
    resize: none;
    width: 100%;
    padding-left: 10px;
    &:focus {
      border-left: 5px solid ${color.petrol()};
    }
  }
  .title {
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

export const Button = BaseButton.extend`
  background-color: ${color.menuDarkGray()};
  border: 2px solid ${color.menuDarkGray()};
  color: ${color.white()};
  &:enabled {
    &:hover {
      background-color: ${color.white()};
      color: ${color.menuDarkGray()};
    }
  }
`;
