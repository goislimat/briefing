import React from 'react';
import PropTypes from 'prop-types';

import { UserInfo, UserActions, DeleteButton, ActionButton } from './styles';

const UserInfoComponent = ({ user, enableForm, removeUser }) => (
  <div className="col-xl row">
    <UserInfo className="col-xl">
      <p className="company">{user.company || 'Sem empresa'}</p>
      <p className="name">{user.name || 'em branco'}</p>
      <p className="email">
        <small>{user.email || 'em branco'}</small>
      </p>
    </UserInfo>
    <UserActions className="col-xl-auto">
      <div className="delete">
        <DeleteButton onClick={() => removeUser(user._id)}>
          <i className="fas fa-times" />
        </DeleteButton>
      </div>
      <div className="edit">
        <ActionButton onClick={() => enableForm()}>
          <i className="fas fa-cog" />
        </ActionButton>
      </div>
      <div className="move">
        <ActionButton>
          <i className="fas fa-bars" />
        </ActionButton>
      </div>
    </UserActions>
  </div>
);

export default UserInfoComponent;

UserInfoComponent.propTypes = {
  user: PropTypes.shape({
    company: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  enableForm: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
};