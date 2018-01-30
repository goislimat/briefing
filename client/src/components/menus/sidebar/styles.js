import styled from 'styled-components';

import color from '../../styles/colors';

export const Main = styled.div`
  background-color: ${color.menuLightGray()};
  color: ${color.white()};
  height: 100%;
  border-bottom: 40px solid ${color.menuDarkGray()};
  header {
    background-color: ${color.menuDarkGray()};
  }
`;

export const Notifications = styled.div`
  border-bottom: 1px solid ${color.grayText()};
  font-size: 1.2rem;
  font-weight: bold;
  height: 99px;
  margin: 0 50px;
  width: 80%;
  .fa {
    margin: 0 10px;
  }
  .counter {
    background-color: ${color.red()};
    border-radius: 15px;
    font-size: 0.8rem;
    margin-left: 5px;
    margin-bottom: 20px;
    padding: 2px 8px;
  }
`;

export const CustomerInfo = styled.div`
  height: 180px;
  width: 100%;
  .icon {
    background-color: ${color.green()};
    border-radius: 30px;
    font-size: 2rem;
    height: 55px;
    margin-right: 40px;
    width: 55px;
  }
  .data {
    .name {
      font-size: 1.5rem;
      font-weight: bolder;
      text-transform: uppercase;
    }
    .email {
      color: ${color.grayText()};
    }
  }
`;

export const MenuList = styled.ul`
  list-style-type: none;
  margin: 60px 0;
  padding-left: 0;
  width: 100%;
  a {
    color: ${color.white()};
    text-decoration: none;
  }
`;

export const MenuListItem = styled.li`
  align-items: center;
  display: flex;
  font-size: 1.2rem;
  font-weight: bolder;
  height: 75px;
  transition: all 0.5s;
  &:hover {
    background-color: ${color.menuDarkGray()};
  }
  .fa {
    margin: 0 35px;
  }
  &.active {
    background-color: ${color.menuDarkGray()};
    border-left: 10px solid ${color.blue()};
    color: ${color.blue()};
  }
`;
