const Section = require('../../models/Section');
const Question = require('../../models/Question');

const authorization = require('../authorization');
const mongoQuery = require('../../helpers/MongoQuery');

module.exports = {
  Query: {
    sections: (root, args, context) => {
      // should return only the sections for a given briefing id
      return Section.find({ _briefing: args._briefing });
    },
  },
  Mutation: {
    createSection: (root, args, context) => {
      if (authorization(context.user, 'ADMIN')) {
        return mongoQuery(Section.create(args));
      } else {
        throw new Error('Você não tem permissão para executar essa operação');
      }
    },
  },
  Section: {
    questions: section => {
      return Question.find({ _section: section._id });
    },
  },
};
