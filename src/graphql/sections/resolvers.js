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
    section: (root, { _id }) => {
      return Section.findById(_id);
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
    updateSection: (root, args, context) => {
      return Section.findByIdAndUpdate(
        args._id,
        { $set: args },
        { new: true }
      ).exec();
    },
    removeSection: (root, args, context) => {
      return Section.findByIdAndRemove(args._id);
    },
  },
  Section: {
    questions: section => {
      return Question.find({ _section: section._id })
        .sort('order')
        .exec();
    },
  },
};
