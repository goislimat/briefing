const User = require('../../models/User');
const mongoQuery = require('../../helpers/MongoQuery');

const authorize = require('../authorization');
const { ADMIN } = require('../constants');

module.exports = {
  Query: {
    // Se existir um usuário em context, então ele passou pelo processo de login
    isAuthenticated: (_, args, { user }) => !!user,
    // Se existir um usuário em context, verificar se ele é ADMIN
    isAdmin: (_, args, { user }) => {
      if (user && user.role === ADMIN) return true;
      return false;
    },
    currentUser: (_, args, { user }) => {
      return user;
    },
    user: (_, args) => {
      // verificar a necessidade desse
      return User.findOne(args);
    },
    // Retorna a lista de usuários
    users: (_, args, { user }) => {
      authorize(user, ADMIN);

      return User.find({}).populate('briefings');
      // return User.find({}).populate('briefings');
    },
  },
  Mutation: {
    // Cria um usuário se o e-mail não estiver sendo usado
    createUser: async (_, args, { user }) => {
      authorize(user, ADMIN);

      const { email } = args;
      const userFound = await mongoQuery(User.findOne({ email }));

      if (userFound) {
        throw new Error('Esse e-mail já foi vinculado a um usuário!');
      }

      return mongoQuery(User.create(args));
    },
    // Atualiza um usuário verificando se o, por algum motivo o e-mail já não pertence a outro usuário
    updateUser: async (_, args, { user }) => {
      authorize(user, ADMIN);

      const { email } = args;
      const userFound = await User.findOne({ email });

      if (userFound._id.toString() !== args._id.toString()) {
        throw new Error('Esse e-mail já foi vinculado a um usuário!');
      }

      return User.findByIdAndUpdate(
        args._id,
        { $set: args },
        { new: true }
      ).exec();
    },
    // Exclui um usuário
    removeUser: (_, args, { user }) => {
      authorize(user, ADMIN);
      return User.findByIdAndRemove(args._id);
    },
    // Informa a senha de um usuário no momento do cadastro
    setPassword: async (_, args) => {
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
    changeUserBlockStatus: (_, args, { user }) => {
      authorize(user, ADMIN);

      return User.findByIdAndUpdate(
        args._id,
        { $set: { active: args.active } },
        { new: true }
      ).exec();
    },
    resetPassword: (_, args, { user }) => {
      authorize(user, ADMIN);

      return User.findByIdAndUpdate(
        args._id,
        { $set: { passwordSet: false } },
        { new: true }
      ).exec();
    },
    manageBriefings: (_, args, { user }) => {
      authorize(user, ADMIN);

      return User.findByIdAndUpdate(
        args._id,
        { $set: { briefings: args.briefings } },
        { new: true }
      ).exec();
    },
  },
  User: {
    briefings: async user => {
      console.log('user', user);
      return user.briefings;
    },
  },
};
