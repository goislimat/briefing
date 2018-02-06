import styled from 'styled-components';

import color from '../../styles/colors';

export const Main = styled.div`
  background-color: ${color.menuLightGray()};
  color: ${color.white()};
  height: 100%;
  border-bottom: 40px solid ${color.menuDarkGray()};
  overflow-y: hidden;
  z-index: 2;
  header {
    background-color: ${color.menuDarkGray()};
  }
  nav {
    height: 75%;
  }
`;

export const Notifications = styled.div`
  border-bottom: 1px solid ${color.grayText()};
  font-size: 1.2rem;
  font-weight: bold;
  height: 99px;
  margin: 0 50px;
  width: 80%;
  .text {
    padding-left: 15px;
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
  padding-left: 35px;
  transition: all 0.5s;
  span {
    padding-left: 35px;
  }
  &:hover {
    background-color: ${color.menuDarkGray()};
  }
  &.active {
    background-color: ${color.menuDarkGray()};
    border-left: 10px solid ${color.blue()};
    color: ${color.blue()};
  }
`;

export const ActionsHolder = styled.div`
  margin: 0;
  width: 100%;
`;

export const ActionsList = styled.ul`
  background-color: ${color.menuDarkGray()};
  padding: 60px 0 60px 0;
`;

export const ActionsMenuListItem = styled.li`
  color: ${color.menuLightGray()};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  height: 75px;
  width: 75px;
  &.active {
    background-color: ${color.menuLightGray()};
    border-bottom: 5px solid ${color.blue()};
    color: ${color.white()};
  }
`;

export const BriefingList = styled.ul`
  padding: 30px 0 80px 0;
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${color.menuLightGray()};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${color.menuDarkGray()};
  }
  > li {
    margin-top: 50px;
    list-style-type: none;
    > a {
      color: ${color.white()};
      text-decoration: none;
      > div {
        background-color: ${color.menuDarkGray()};
        font-weight: bold;
        padding: 10px 20px;
        width: 100%;
        text-transform: uppercase;
      }
    }
  }
`;

export const SectionList = styled.ul`
  padding: 0 10px;
  > li {
    list-style-type: none;
    margin: 5px 0;
    > a {
      color: ${color.white()};
      text-decoration: none;
      > div {
        border: 2px solid ${color.menuDarkGray()};
        font-size: 0.7rem;
        font-weight: bold;
        padding: 10px;
        width: 100%;
        text-transform: uppercase;
        &.active {
          border: 2px solid ${color.blue()};
          color: ${color.blue()};
        }
      }
    }
  }
`;
