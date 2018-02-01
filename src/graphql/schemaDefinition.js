const merge = require('lodash/merge');
const { makeExecutableSchema } = require('graphql-tools');
const requireGraphQL = require('require-graphql-file');

// GraphQL Schemas
const BriefingSchema = requireGraphQL('./briefings/BriefingSchema');
const QuestionSchema = requireGraphQL('./questions/QuestionSchema');
const SectionSchema = requireGraphQL('./sections/SectionSchema');
const UserSchema = requireGraphQL('./users/UserSchema');

// GraphQL Resolvers
const BriefingResolvers = require('./briefings/resolvers');
const QuestionResolvers = require('./questions/resolvers');
const SectionResolvers = require('./sections/resolvers');
const UsersResolvers = require('./users/resolvers');

const typeDefs = [BriefingSchema, QuestionSchema, SectionSchema, UserSchema];

const resolvers = merge(
  BriefingResolvers,
  QuestionResolvers,
  SectionResolvers,
  UsersResolvers
);

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
