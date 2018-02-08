import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import UserQuery from '../../../queries/User';

import { CardGutter, Card, UserIcon } from './styles';
import UserInfo from './UserInfo';
import UserForm from './UserForm';
import ManageBriefingsForm from './ManageBriefingsForm';

class UserCard extends Component {
  state = {
    showEditForm: false,
  };

  enableEditForm = () => this.setState({ showEditForm: true });
  disableEditForm = () => this.setState({ showEditForm: false });

  genereateRandomColor = () => Math.floor(Math.random() * 6 + 1); // eslint-disable-line

  chooseIcon = (user) => {
    if (!user.active) {
      return <i className="fas fa-ban" />;
    } else if (user.role === 'USER') {
      return <i className="fas fa-user-circle" />;
    }
    return <i className="fab fa-superpowers" />;
  };

  render() {
    const {
      user, briefings, update, remove, blockStatus, reset,
    } = this.props;
    const { showEditForm } = this.state;

    return (
      <CardGutter className="col-xl-6">
        <Card color={this.genereateRandomColor()} className="row">
          <UserIcon className="col-xl-3">{this.chooseIcon(user)}</UserIcon>

          {showEditForm ? (
            <UserForm
              mode="EDIT"
              updateUser={update}
              changeUserBlockStatus={blockStatus}
              resetPassword={reset}
              user={user}
              disableForm={this.disableEditForm}
            />
          ) : (
            <UserInfo user={user} removeUser={remove} enableForm={this.enableEditForm} />
          )}
        </Card>
        <ManageBriefingsForm
          briefings={briefings}
          userId={user._id}
          userBriefings={user.briefings}
        />
      </CardGutter>
    );
  }
}

const UserCardWithData = compose(
  graphql(UserQuery.resetPassword, {
    name: 'resetPassword',
    props: ({ resetPassword }) => ({
      reset: userId =>
        resetPassword({
          variables: { _id: userId },
        }),
    }),
  }),
  graphql(UserQuery.changeUserBlockStatus, {
    name: 'changeUserBlockStatus',
    props: ({ changeUserBlockStatus }) => ({
      blockStatus: userData =>
        changeUserBlockStatus({
          variables: userData,
        }),
    }),
  }),
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
