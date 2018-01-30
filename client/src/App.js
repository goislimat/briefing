import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const App = ({ data: { loading, books } }) => {
  if (loading) return loading;
  return (
    <ul>
      {books.map((book, i) => (
        <li key={i}>
          {book.title} - {book.author}
        </li>
      ))}
    </ul>
  );
};

const BOOKS_QUERY = gql`
  query books {
    books {
      title
      author
    }
  }
`;

export default graphql(BOOKS_QUERY)(App);
