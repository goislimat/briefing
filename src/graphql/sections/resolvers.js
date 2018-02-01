const Section = require('../../models/Section');
const Question = require('../../models/Question');

module.exports = {
  Query: {
    sections: () => {
      // should return only the sections for a given briefing id
      return Section.find({});
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
