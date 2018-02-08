const Briefing = require('../../models/Briefing');
const Section = require('../../models/Section');

const authorize = require('../authorization');
const { ADMIN } = require('../constants');
const mongoQuery = require('../../helpers/MongoQuery');

module.exports = {
  Query: {
    briefings: () => {
      return Briefing.find({});
    },
    briefing: (_, args) => {
      return Briefing.findById(args._id);
    },
  },
  Mutation: {
    // Cria um briefing
    createBriefing: (_, args, { user }) => {
      authorize(user, ADMIN);
      return mongoQuery(Briefing.create(args));
    },
    // Atualiza um briefing
    updateBriefing: (_, args, { user }) => {
      authorize(user, ADMIN);
      return Briefing.findByIdAndUpdate(
        args._id,
        { $set: args },
        { new: true }
      ).exec();
    },
    // Procura um briefing e o remove usando o middleware
    removeBriefing: async (_, args, { user }) => {
      authorize(user, ADMIN);

      const briefing = await Briefing.findOne({ _id: args._id });
      return briefing.remove();
    },
  },
  Briefing: {
    // Recupera as seções de um briefing
    sections: briefing => {
      return Section.find({ _briefing: briefing._id });
    },
  },
};
