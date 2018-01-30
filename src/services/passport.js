const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

const submissionErrors = (email, password) => {
  if (!email) {
    return 'E-mail obrigatório'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return 'E-mail inválido'
  } else if (!password) {
    return 'Senha obrigatória'
  } else if (password.length < 6) {
    return 'Senha deve ter, no mínimo, 6 caracteres'
  }

  return null
}

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      const error = submissionErrors(email, password)
      if (error) return done(null, false, { message: error })

      let user

      try {
        user = await User.findOne({ email })
      } catch (err) {
        return done(err, false)
      }
      if (!user) {
        return done(null, false, {
          message: 'Esse e-mail não pode logar no sistema'
        })
      }
      if (!user.active) {
        return done(null, false, {
          message: 'O seu login foi desativado pelo admin'
        })
      }
      if (!user.passwordSet) {
        return done(null, false, {
          message: 'Por favor, cadastre sua senha no botão ao lado!'
        })
      }

      const validPassword = await user.validatePassword(password)

      if (validPassword) {
        user.password = undefined
        return done(null, user)
      }

      return done(null, false, {
        message: 'Essa combinação de usuário e senha não é válida'
      })
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  user.password = undefined
  done(null, user)
})
