import gql from 'graphql-tag';

export default {
  users: gql`
    query users {
      users {
        _id
        active
        email
        name
        passwordSet
        role
      }
    }
  `,
  isAuthenticated: gql`
    query isAuthenticated {
      isAuthenticated
    }
  `,
  setPassword: gql`
    mutation setPassword($email: String!, $password: String!, $passwordConfirmation: String!) {
      setPassword(email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
        _id
      }
    }
  `,
};
