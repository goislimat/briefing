import styled from 'styled-components';

import color from '../../../styles/colors';
import BaseButton from '../../../styles/BaseButton';

export const CardGutter = styled.div`
  padding: 20px;
`;

export const Card = styled.div`
  background-color: ${color.white()};
  padding: 45px;
  .question {
    font-size 1.3rem;
    font-weight: bold;
  }
`;

export const Controls = styled.div`
  background-color: ${color.white()};
  padding: 0;
`;

export const Button = BaseButton.extend`
  border: 0;
  color: ${color.white()};
  &.move {
    background-color: ${color.menuDarkGray()};
    cursor: move;
    padding: 15px 20px;
  }
  &.more-info {
    background-color: ${color.orange()};
    padding: 10px 20px;
  }
`;
