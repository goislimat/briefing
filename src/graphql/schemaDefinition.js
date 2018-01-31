const merge = require('lodash/merge');
const { makeExecutableSchema } = require('graphql-tools');
const requireGraphQL = require('require-graphql-file');

// GraphQL Schemas
const BriefingSchema = requireGraphQL('./briefings/BriefingSchema');
const UserSchema = requireGraphQL('./users/UserSchema');

// GraphQL Resolvers
const BriefingResolvers = require('./briefings/resolvers');
const UsersResolvers = require('./users/resolvers');

const typeDefs = [BriefingSchema, UserSchema];
const resolvers = merge(BriefingResolvers, UsersResolvers);

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
