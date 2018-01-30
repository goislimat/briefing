const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
  active: { type: Boolean, default: true },
  email: { type: String, required: true },
  company: String,
  name: { type: String, required: true },
  password: String,
  passwordSet: { type: Boolean, default: false },
  role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' }
})

UserSchema.methods.generateHash = function generateHash (password) {
  return bcrypt.hash(password, 10)
}

UserSchema.methods.validatePassword = function validatePassword (password) {
  return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('users', UserSchema)
