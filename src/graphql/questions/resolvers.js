const Question = require('../../models/Question');

module.exports = {
  Query: {
    questions: () => {
      // verificar permissões e somente retornar as questões de determinada seção
      return Question.find({});
    },
  },
};
