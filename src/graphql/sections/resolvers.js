const Section = require('../../models/Section');

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
  // Section: {
  //   questions: section => {
  //     console.log(section);
  //   },
  // },
};
