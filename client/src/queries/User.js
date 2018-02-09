import gql from 'graphql-tag';

export default {
  usersPage: gql`
    query users {
      users {
        _id
        active
        company
        email
        name
        passwordSet
        role
        briefings {
          _id
        }
      }
      briefings {
        _id
        title
      }
    }
  `,
  currentUser: gql`
    query {
      currentUser {
        company
        email
      }
    }
  `,
  isAuthenticated: gql`
    query isAuthenticated {
      isAuthenticated
      isAdmin
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
  setPassword: gql`
    mutation setPassword($email: String!, $password: String!, $passwordConfirmation: String!) {
      setPassword(email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
        _id
      }
    }
  `,
  changeUserBlockStatus: gql`
    mutation($_id: String!, $active: Boolean!) {
      changeUserBlockStatus(_id: $_id, active: $active) {
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
  resetPassword: gql`
    mutation($_id: String!) {
      resetPassword(_id: $_id) {
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
  manageBriefings: gql`
    mutation($_id: String!, $briefings: [String!]) {
      manageBriefings(_id: $_id, briefings: $briefings) {
        _id
        active
        company
        email
        name
        passwordSet
        role
        briefings {
          _id
        }
      }
    }
  `,
};
