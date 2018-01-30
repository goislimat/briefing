import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import dateFormat from 'dateformat';

import dateFormai18n from '../../helpers/dateFormati18n';
import Accounts from '../../../api/Accounts';
import { Main, SearchBar, Actions, Button } from './styles';

dateFormat.i18n = dateFormai18n;

const TopMenu = ({ client: { resetStore } }) => (
  <Main className="col-xl-12 row d-flex align-items-center">
    <SearchBar className="col-xl-4 d-flex align-items-center">
      <input type="text" className="col" placeholder="Pesquisa" />
      <span className="col-auto">
        <i className="fa fa-search" aria-hidden="true" />
      </span>
    </SearchBar>
    <Actions className="menu col-xl-8 row d-flex justify-content-between align-items-center">
      <div>{dateFormat(Date.now(), "dddd, dd 'de' mmmm 'de' yyyy")}</div>
      <Button onClick={() => Accounts.logout().then(() => resetStore())}>Sair</Button>
    </Actions>
  </Main>
);

export default withApollo(TopMenu);

TopMenu.propTypes = {
  client: PropTypes.shape({
    resetStore: PropTypes.func,
  }).isRequired,
};
