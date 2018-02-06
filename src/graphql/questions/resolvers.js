const Question = require('../../models/Question');

const authorization = require('../authorization');
const mongoQuery = require('../../helpers/MongoQuery');

module.exports = {
  Query: {
    questions: (root, args, context) => {
      // verificar permissões e somente retornar as questões de determinada seção
      return Question.find(args);
    },
    question: (root, args, context) => {
      return Question.findById(args._id);
    },
  },
  Mutation: {
    createQuestion: async (root, args, context) => {
      console.log('args', args);
      if (authorization(context.user, 'ADMIN')) {
        if (args.type === 'ESCOLHA' && args.options.length === 0) {
          throw new Error(
            'Você deve inserir ao menos uma opção para perguntas de múltipla escolha'
          );
        }

        const order = await Question.count({ _section: args._section }).exec();

        return mongoQuery(
          Question.create({
            ...args,
            order: order + 1,
          })
        );
      } else {
        throw new Error('Você não tem permissão para executar essa operação');
      }
    },
    updateQuestion: (root, args, context) => {
      return Question.findByIdAndUpdate(
        args._id,
        { $set: args },
        { new: true }
      ).exec();
    },
    removeQuestion: (root, args, context) => {
      return Question.findByIdAndRemove(args._id);
    },
    saveSorting: (root, args, context) => {
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
