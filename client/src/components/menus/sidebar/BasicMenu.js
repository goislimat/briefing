import React from 'react';
import { Link } from 'react-router-dom';

import history from '../../../history';
import { MenuList, MenuListItem } from './styles';

const setActiveMenuOption = () => {
  switch (history.location.pathname) {
    case '/dashboard':
      return 'início';
    case '/dashboard/clientes':
      return 'clientes';
    case '/dashboard/configuracoes':
      return 'configurações';
    default:
      return 'perguntas';
  }
};

const BasicMenu = () => (
  <MenuList>
    <Link to="/dashboard">
      <MenuListItem className={setActiveMenuOption() === 'início' ? 'active' : ''}>
        <i className="fas fa-home" /> <span>Início</span>
      </MenuListItem>
    </Link>
    <Link to="/dashboard/clientes">
      <MenuListItem className={setActiveMenuOption() === 'clientes' ? 'active' : ''}>
        <i className="fas fa-users" />
        <span>Clientes</span>
      </MenuListItem>
    </Link>
    <Link to="/dashboard/briefings">
      <MenuListItem className={setActiveMenuOption() === 'perguntas' ? 'active' : ''}>
        <i className="fab fa-wpforms" />
        <span>Questionários</span>
      </MenuListItem>
    </Link>
    <Link to="/dashboard/configuracoes">
      <MenuListItem className={setActiveMenuOption() === 'configurações' ? 'active' : ''}>
        <i className="fas fa-cogs" />
        <span>Configurações</span>
      </MenuListItem>
    </Link>
  </MenuList>
);

export default BasicMenu;
