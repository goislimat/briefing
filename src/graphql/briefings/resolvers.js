const Briefing = require('../../models/Briefing');
const Section = require('../../models/Section');

const authorization = require('../authorization');
const mongoQuery = require('../../helpers/MongoQuery');
module.exports = {
  Query: {
    briefings: () => {
      return Briefing.find({});
    },
    briefing: (root, args) => {
      return Briefing.findById(args._id);
    },
  },
  Mutation: {
    createBriefing: (root, args, context) => {
      if (authorization(context.user, 'ADMIN')) {
        return mongoQuery(Briefing.create(args));
      } else {
        throw new Error('Você não tem permissão para executar essa operação');
      }
    },
  },
  Briefing: {
    sections: briefing => {
      return Section.find({ _briefing: briefing._id });
    },
  },
};
