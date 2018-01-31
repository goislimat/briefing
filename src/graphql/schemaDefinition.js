const merge = require('lodash/merge');
const { makeExecutableSchema } = require('graphql-tools');
const requireGraphQL = require('require-graphql-file');

// GraphQL Schemas
const BriefingSchema = requireGraphQL('./briefings/BriefingSchema');
const SectionSchema = requireGraphQL('./sections/SectionSchema');
const UserSchema = requireGraphQL('./users/UserSchema');

// GraphQL Resolvers
const BriefingResolvers = require('./briefings/resolvers');
const SectionResolvers = require('./sections/resolvers');
const UsersResolvers = require('./users/resolvers');

const typeDefs = [BriefingSchema, SectionSchema, UserSchema];
const resolvers = merge(BriefingResolvers, SectionResolvers, UsersResolvers);

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
