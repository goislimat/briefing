import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import UserQuery from '../../../queries/User';

import { CardGutter, Card, UserIcon } from './styles';
import UserInfo from './UserInfo';
import UserForm from './UserForm';

class UserCard extends Component {
  state = {
    showEditForm: false,
  };

  enableEditForm = () => this.setState({ showEditForm: true });
  disableEditForm = () => this.setState({ showEditForm: false });

  genereateRandomColor = () => Math.floor(Math.random() * 6 + 1); // eslint-disable-line

  render() {
    const { user, update, remove } = this.props;
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
            <UserForm
              mode="EDIT"
              updateUser={update}
              user={user}
              disableForm={this.disableEditForm}
            />
          ) : (
            <UserInfo user={user} removeUser={remove} enableForm={this.enableEditForm} />
          )}
        </Card>
      </CardGutter>
    );
  }
}

const UserCardWithData = compose(
  graphql(UserQuery.removeUser, {
    name: 'removeUser',
    props: ({ removeUser }) => ({
      remove: userId =>
        removeUser({
          variables: {
            _id: userId,
          },
          update: (store) => {
            const data = store.readQuery({
              query: UserQuery.users,
            });

            const removedIndex = data.users.findIndex(el => el._id === userId);
            data.users.splice(removedIndex, 1);

            store.writeQuery({
              query: UserQuery.users,
              data,
            });
          },
        }),
    }),
  }),
  graphql(UserQuery.updateUser, {
    name: 'updateUser',
    props: ({ updateUser }) => ({
      update: userData =>
        updateUser({
          variables: userData,
        }),
    }),
  }),
)(UserCard);

export default UserCardWithData;

UserCard.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string,
  }).isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};
