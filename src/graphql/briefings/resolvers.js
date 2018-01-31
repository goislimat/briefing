const Briefing = require('../../models/Briefing');

module.exports = {
  Query: {
    briefings: () => {
      return Briefing.find({});
    },
  },
  Mutation: {
    createBriefing: (root, args, context) => {
      // verify in the context if the user has the correct rights
      return Briefing.create(args);
    },
  },
};
