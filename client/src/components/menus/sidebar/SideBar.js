import React from 'react';
import { graphql } from 'react-apollo';

import history from '../../../history';
import UserQuery from '../../../queries/User';

import Loader from '../../styles/Loader';
import { Main, Notifications, CustomerInfo } from './styles';
import BasicMenu from './BasicMenu';
import ActionMenu from './ActionMenu';

const SideBar = ({ data: { loading, currentUser } }) => {
  if (loading) return <Loader />;

  return (
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
            <div className="name text-left">{currentUser.company}</div>
            <div className="email">{currentUser.email}</div>
          </div>
        </CustomerInfo>
      </header>
      <nav className="row">
        {/perguntas/i.test(history.location.pathname) ? <ActionMenu /> : <BasicMenu />}
      </nav>
    </Main>
  );
};

const SideBarWithData = graphql(UserQuery.currentUser)(SideBar);

export default SideBarWithData;
