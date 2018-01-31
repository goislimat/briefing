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
        <i className="fa fa-bell" aria-hidden="true" /> Notificações{' '}
        <span className="counter">4</span>
      </Notifications>
      <CustomerInfo className="d-flex justify-content-center align-items-center">
        <div className="icon d-flex justify-content-center align-items-center">
          <i className="fa fa-star" aria-hidden="true" />
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
            <i className="fa fa-home" aria-hidden="true" /> Início
          </MenuListItem>
        </Link>
        <Link to="/dashboard/clientes">
          <MenuListItem className={setActiveMenuOption() === 'clientes' ? 'active' : ''}>
            <i className="fa fa-user" aria-hidden="true" /> Clientes
          </MenuListItem>
        </Link>
        <Link to="/dashboard/briefings">
          <MenuListItem className={setActiveMenuOption() === 'perguntas' ? 'active' : ''}>
            <i className="fa fa-th-list" aria-hidden="true" /> Questionários
          </MenuListItem>
        </Link>
        <Link to="/dashboard/configuracoes">
          <MenuListItem className={setActiveMenuOption() === 'configurações' ? 'active' : ''}>
            <i className="fa fa-cog" aria-hidden="true" /> Configurações
          </MenuListItem>
        </Link>
      </MenuList>
    </nav>
  </Main>
);

export default SideBar;
