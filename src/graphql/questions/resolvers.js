const Question = require('../../models/Question');

const authorization = require('../authorization');
const mongoQuery = require('../../helpers/MongoQuery');

module.exports = {
  Query: {
    questions: (roote, args, context) => {
      // verificar permissões e somente retornar as questões de determinada seção
      return Question.find(args);
    },
  },
  Mutation: {
    createQuestion: async (root, args, context) => {
      if (authorization(context.user, 'ADMIN')) {
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
  },
};
