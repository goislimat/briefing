import styled from 'styled-components';

import color from '../../styles/colors';

export const CardGutter = styled.div`
  padding: 20px;
`;

export const Card = styled.div`
  background-color: ${color.white()};
  padding: 50px;
  > * {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &:first-child {
    margin-bottom: 20px;
  }
`;

export const QuestionDiv = styled.div`
  font-size: 1.1rem;
`;
