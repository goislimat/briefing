module.exports = (user, requiredRole) => {
  if (!user || requiredRole.indexOf(user.role) === -1) {
    throw new Error('Você não tem permissão pra executar essa operação');
  }
};
