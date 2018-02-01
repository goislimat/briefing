const Section = require('../../models/Section');
const Question = require('../../models/Question');

module.exports = {
  Query: {
    sections: (root, args, context) => {
      // should return only the sections for a given briefing id
      return Section.find({ _briefing: args._briefing });
    },
  },
  Mutation: {
    createSection: (root, args, context) => {
      // verify if the user is ADMIN
      return Section.create(args);
    },
  },
  Section: {
    questions: section => {
      return Question.find({ _section: section._id });
    },
  },
};
