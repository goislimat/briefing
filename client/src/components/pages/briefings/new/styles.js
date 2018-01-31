import styled from 'styled-components';
import { Form } from 'formik';

import color from '../../../styles/colors';
import BaseButton from '../../../styles/BaseButton';

export const StyledForm = styled(Form)`
  background-color: ${color.white()};
  margin-top: 30px;
  height: auto;
  padding: 50px;
  input,
  textarea {
    border: 0;
  }
  .title {
    font-size: 1.3rem;
    font-weight: bold;
  }
  .description {
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
