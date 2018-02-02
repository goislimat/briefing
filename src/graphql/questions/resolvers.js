const Question = require('../../models/Question');

module.exports = {
  Query: {
    questions: () => {
      // verificar permissões e somente retornar as questões de determinada seção
      return Question.find({});
    },
  },
  Mutation: {
    createQuestion: async (root, args, context) => {
      const order = await Question.count({ _section: args._section }).exec();

      return Question.create({
        ...args,
        order: order + 1,
      });
    },
  },
};
