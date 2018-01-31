const Briefing = require('../../models/Briefing');
const Section = require('../../models/Section');

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
  Briefing: {
    sections: briefing => {
      return Section.find({ _briefing: briefing._id });
    },
  },
};
