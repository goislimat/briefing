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
    font-weight: bold;
  }
`;

export const Controls = styled.div`
  background-color: ${color.white()};
  padding: 0;
`;

export const Button = BaseButton.extend`
  &.move {
    background-color: transparent;
    border: 0;
    color: #ddd;
    cursor: move;
    padding: 5px 20px 20px 20px;
  }
  &.more-info {
    background-color: transparent;
    border: 2px solid #ddd;
    color: #ddd;
    width: 100%;
  }
`;
