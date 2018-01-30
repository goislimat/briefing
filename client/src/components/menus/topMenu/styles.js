import styled from 'styled-components';

import color from '../../styles/colors';
import BaseButton from '../../styles/BaseButton';

export const Main = styled.nav`
  min-height: 99px;
  padding: 0 30px 0 100px;
`;

export const SearchBar = styled.div`
  border: 1px solid black;
  padding: 5px 0;
  input {
    border: 0;
    outline: 0;
    line-height: 2;
  }
  span {
    color: ${color.grayText()};
    cursor: pointer;
  }
`;

export const Button = BaseButton.extend`
  background-color: ${color.white()};
  border: 2px solid ${color.red()};
  color: ${color.red()};
  padding: 5px 100px;
  &:hover {
    background-color: ${color.red()};
    color: ${color.white()};
  }
`;

export const Actions = styled.div`
  div {
    padding-left: 50px;
  }
`;
