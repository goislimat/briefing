import gql from 'graphql-tag';

export default {
  users: gql`
    query users {
      users {
        _id
        active
        company
        email
        name
        passwordSet
        role
      }
    }
  `,
  createUser: gql`
    mutation($company: String!, $email: String!, $name: String!) {
      createUser(company: $company, email: $email, name: $name) {
        _id
        active
        company
        email
        name
        passwordSet
        role
      }
    }
  `,
  updateUser: gql`
    mutation($_id: String!, $company: String!, $email: String!, $name: String!) {
      updateUser(_id: $_id, company: $company, email: $email, name: $name) {
        _id
        active
        company
        email
        name
        passwordSet
        role
      }
    }
  `,
  removeUser: gql`
    mutation($_id: String!) {
      removeUser(_id: $_id)
    }
  `,
  isAuthenticated: gql`
    query isAuthenticated {
      isAuthenticated
      isAdmin
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
