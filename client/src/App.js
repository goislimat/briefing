import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const App = ({ data: { loading, users } }) => {
  if (loading) return <div>Loafing...</div>;
  if (!users) return <div>There&apos;s no data to be shown</div>;
  return (
    <ul>
      {users.map(user => (
        <li key={user._id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
};

const BOOKS_QUERY = gql`
  query books {
    users {
      _id
      name
      email
    }
  }
`;

export default graphql(BOOKS_QUERY)(App);
