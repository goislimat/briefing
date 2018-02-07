import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CardGutter, Card, UserIcon } from './styles';
import UserInfo from './UserInfo';
import UserForm from './UserForm';

class UserCard extends Component {
  state = {
    showEditForm: true,
  };

  enableEditForm = () => this.setState({ showEditForm: true });
  disableEditForm = () => this.setState({ showEditForm: false });

  genereateRandomColor = () => Math.floor(Math.random() * 6 + 1); // eslint-disable-line

  render() {
    const { user } = this.props;
    const { showEditForm } = this.state;

    return (
      <CardGutter className="col-xl-6">
        <Card color={this.genereateRandomColor()} className="row">
          <UserIcon className="col-xl-3">
            {user.role === 'USER' ? (
              <i className="fas fa-user-circle" />
            ) : (
              <i className="fab fa-superpowers" />
            )}
          </UserIcon>

          {showEditForm ? (
            <UserForm mode="EDIT" user={user} disableForm={this.disableEditForm} />
          ) : (
            <UserInfo user={user} enableForm={this.enableEditForm} />
          )}
        </Card>
      </CardGutter>
    );
  }
}

export default UserCard;

UserCard.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string,
  }).isRequired,
};
