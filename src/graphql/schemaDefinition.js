const merge = require('lodash/merge')
const { makeExecutableSchema } = require('graphql-tools')

// GraphQL Schemas
// import BriefingSchema from './briefings/Briefing.graphql'
const UserSchema = require('./users/UserSchema')

// GraphQL Resolvers
// import BriefingsResolvers from './briefings/resolvers'
// import UsersResolvers from './users/resolvers'
const UsersResolvers = require('./users/resolvers')

const typeDefs = [UserSchema]
const resolvers = merge(UsersResolvers)

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
})
