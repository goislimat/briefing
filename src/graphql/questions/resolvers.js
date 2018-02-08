const Question = require('../../models/Question');

const authorize = require('../authorization');
const { ADMIN } = require('../constants');
const mongoQuery = require('../../helpers/MongoQuery');

module.exports = {
  Query: {
    // verificar a necessidade desse
    questions: (_, args) => {
      return Question.find(args);
    },
    question: (_, args) => {
      return Question.findById(args._id);
    },
  },
  Mutation: {
    // Cria uma pergunta
    createQuestion: async (_, args, { user }) => {
      authorize(user, ADMIN);

      const lastQuestion = await Question.find({ _section: args._section })
        .sort({ order: -1 })
        .limit(1)
        .exec();
      return mongoQuery(
        Question.create({
          ...args,
          order: lastQuestion[0].order + 1,
        })
      );
    },
    // Atualiza uma pergunta
    updateQuestion: (_, args, { user }) => {
      authorize(user, ADMIN);
      return Question.findByIdAndUpdate(
        args._id,
        { $set: args },
        { new: true }
      ).exec();
    },
    // Remove uma pergunta
    removeQuestion: (_, args, { user }) => {
      authorize(user, ADMIN);
      return Question.findByIdAndRemove(args._id);
    },
    // Reordena as perguntas
    saveSorting: (_, args, { user }) => {
      authorize(user, ADMIN);

      try {
        args.sorting.map(async (questionId, i) => {
          await Question.update(
            { _id: questionId },
            { $set: { order: i + 1 } }
          );
        });
        return true;
      } catch (err) {
        return false;
      }
    },
  },
};
