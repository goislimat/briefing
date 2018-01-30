module.exports = `
type User {
  _id: String!
  active: Boolean
  email: String!
  company: String
  name: String!
  password: String
  passwordSet: Boolean
  role: Role
}

enum Role {
  ADMIN
  USER
}

type Query {
  isAuthenticated: Boolean
  user(email: String): User
  users: [User]
}

type Mutation {
  createUser(email: String!, name: String!, role: Role): User
  setPassword(
    email: String!
    password: String!
    passwordConfirmation: String!
  ): User
}

`
