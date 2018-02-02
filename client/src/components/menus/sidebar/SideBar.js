import React from 'react';
import { Link } from 'react-router-dom';

import history from '../../../history';
import { Main, Notifications, CustomerInfo, MenuList, MenuListItem } from './styles';

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

const SideBar = () => (
  <Main className="col-xl-3">
    <header className="row text-center">
      <Notifications className="d-flex justify-content-center align-items-center">
        <i className="fas fa-bell" /> <span className="text">Notificações</span>{' '}
        <span className="counter">4</span>
      </Notifications>
      <CustomerInfo className="d-flex justify-content-center align-items-center">
        <div className="icon d-flex justify-content-center align-items-center">
          <i className="far fa-star" />
        </div>
        <div className="data">
          <div className="name text-left">Petrol Design</div>
          <div className="email">contato@petroldesign.com.br</div>
        </div>
      </CustomerInfo>
    </header>
    <nav className="row">
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
    </nav>
  </Main>
);

export default SideBar;
