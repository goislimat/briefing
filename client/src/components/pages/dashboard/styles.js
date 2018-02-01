import styled from 'styled-components';

import color from '../../styles/colors';
import BaseButton from '../../styles/BaseButton';

export const Content = styled.div`
  background-color: ${color.bodyGray()};
  height: 90%;
  padding: 50px;
  overflow-y: auto;
`;

export const Container = styled.div`
  margin: auto;
  width: 1000px;
`;

export const GutterCard = styled.div`
  padding: 20px;
`;

export const Button = BaseButton.extend`
  background-color: transparent;
  border: 2px solid #aaa;
  color: #aaa;
  padding: 5px 0;
  width: 100%;
`;

export const Card = styled.div.attrs({
  color: ({ cardColor }) => {
    if (cardColor === 'blue') return color.blue();
    if (cardColor === 'yellow') return color.yellow();
    if (cardColor === 'orange') return color.orange();
    return color.green();
  },
})`
  background-color: ${color.white()};
  padding: 45px;
  transition: all 0.5s;
  &:hover {
    box-shadow: 0 0 30px #676767;
    ${Button} {
      background-color: ${props => props.color};
      border: 2px solid ${props => props.color};
      color: ${color.white()};
    }
  }
  .title {
    color: ${props => props.color};
    font-weight: bold;
    text-transform: uppercase;
  }
  p {
    align-items: center;
    display: flex;
    min-height: 75px;
  }
  > * {
    &:not(:last-child) {
      margin-bottom: 30px;
    }
  }
`;
