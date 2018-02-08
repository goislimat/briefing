const Section = require('../../models/Section');
const Question = require('../../models/Question');

const authorize = require('../authorization');
const { ADMIN } = require('../constants');
const mongoQuery = require('../../helpers/MongoQuery');

module.exports = {
  Query: {
    // ver a necessidade desse
    sections: (_, args) => {
      return Section.find({ _briefing: args._briefing });
    },
    // Retorna a seção por seu ID
    section: (_, args) => {
      return Section.findById(args._id);
    },
  },
  Mutation: {
    // Cria uma seção
    createSection: (_, args, { user }) => {
      authorize(user, ADMIN);
      return mongoQuery(Section.create(args));
    },
    // Atualiza um seção
    updateSection: (_, args, { user }) => {
      authorize(user, ADMIN);

      return Section.findByIdAndUpdate(
        args._id,
        { $set: args },
        { new: true }
      ).exec();
    },
    // Encontra um aseção e chama o middleware de remoção, para
    // exclusão em cascata de perguntas relacionadas
    removeSection: (_, args, { user }) => {
      authorize(user, ADMIN);

      const section = Section.findById(args._id);
      return section.remove();
    },
  },
  Section: {
    // Retorna as perguntas de uma seção ordenadas de acordo com a
    // ordem estabelecida
    questions: section => {
      return Question.find({ _section: section._id })
        .sort('order')
        .exec();
    },
  },
};
