import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import UserQuery from '../../../queries/User';

import Loader from '../../styles/Loader';
import { CardGutter, Card, UserIcon, AddButton } from './styles';

import UserCard from './UserCard';
import UserForm from './UserForm';

class UsersPage extends Component {
  state = {
    showCreateForm: false,
  };

  enableCreateForm = () => this.setState({ showCreateForm: true });
  disableCreateForm = () => this.setState({ showCreateForm: false });

  render() {
    const { data: { loading, users }, create } = this.props;
    const { showCreateForm } = this.state;

    if (loading) return <Loader />;

    return (
      <div className="row">
        {users.map(user => <UserCard key={user._id} user={user} />)}
        <CardGutter className="col-xl-6">
          <Card className="row new">
            {showCreateForm && (
              <UserIcon className="col-xl-3">
                <i className="fas fa-user-circle" />
              </UserIcon>
            )}

            {showCreateForm ? (
              <UserForm mode="CREATE" createUser={create} disableForm={this.disableCreateForm} />
            ) : (
              <div className="col-xl-12 d-flex align-items-center justify-content-center">
                <AddButton onClick={this.enableCreateForm}>
                  <i className="fas fa-plus-circle" />
                </AddButton>
              </div>
            )}
          </Card>
        </CardGutter>
      </div>
    );
  }
}

const UsersPageWithData = compose(
  graphql(UserQuery.createUser, {
    name: 'createUser',
    props: ({ createUser }) => ({
      create: newUser =>
        createUser({
          variables: newUser,
          update: (store, { data: { createUser: createdUser } }) => {
            const data = store.readQuery({
              query: UserQuery.users,
            });

            data.users.push(createdUser);

            store.writeQuery({
              query: UserQuery.users,
              data,
            });
          },
        }),
    }),
  }),
  graphql(UserQuery.users),
)(UsersPage);

export default UsersPageWithData;

UsersPage.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    users: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string,
    })),
  }).isRequired,
  create: PropTypes.func.isRequired,
};
