const User = require('../../models/User');
const mongoQuery = require('../../helpers/MongoQuery');

module.exports = {
  Query: {
    isAuthenticated (root, args, context) {
      // console.log(context);
      return !!context.user;
    },
    user (root, args) {
      return User.findOne(args);
    },
    users (root, args, context) {
      // if(context.user.role !== 'ADMIN') verificar permissões
      return User.find({});
    },
  },
  Mutation: {
    async createUser (root, args) {
      const { email } = args;
      const user = await mongoQuery(User.findOne({ email }));

      if (user) throw new Error('Esse e-mail já foi vinculado a um usuário!');

      return mongoQuery(User.create(args));
    },
    async setPassword (root, args) {
      const { email, password, passwordConfirmation } = args;

      if (password !== passwordConfirmation) {
        throw new Error('A senha e sua confirmação devem ser idênticas');
      }

      const user = await mongoQuery(User.findOne({ email }));

      if (!user) {
        throw new Error('Esse e-mail não pode acessar o nosso sistema.');
      } else if (user.passwordSet) {
        throw new Error('Sua senha já foi cadastrada. Tente efetuar o login.');
      }

      user.password = await user.generateHash(password);
      user.passwordSet = true;
      return mongoQuery(user.save());
    },
  },
};
