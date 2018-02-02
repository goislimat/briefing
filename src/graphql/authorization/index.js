module.exports = (user, requiredRole) => requiredRole.indexOf(user.role) !== -1;
