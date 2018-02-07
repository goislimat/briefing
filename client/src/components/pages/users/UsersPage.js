import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import UserQuery from '../../../queries/User';

import Loader from '../../styles/Loader';
import { CardGutter, Card } from './styles';

import UserCard from './UserCard';

const UsersPage = ({ data: { loading, users } }) => {
  if (loading) return <Loader />;

  return (
    <div className="row">
      {users.map(user => <UserCard key={user._id} user={user} />)}
      <CardGutter className="col-xl-6">
        <Card>Novo</Card>
      </CardGutter>
    </div>
  );
};

const UsersPageWithData = graphql(UserQuery.users)(UsersPage);

export default UsersPageWithData;

UsersPage.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    users: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string,
    })),
  }).isRequired,
};
