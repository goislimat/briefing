const passport = require('passport')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const schema = require('../graphql/schemaDefinition')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  app.use(
    '/graphql',
    graphqlExpress(req => ({
      schema,
      context: {
        user: req.user
      }
    }))
  )

  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql'
    })
  )

  app.post('/auth/login', (req, res, next) => {
    passport.authenticate(
      'local-login',
      {
        badRequestMessage: 'Os campos e-mail e senha não podem estar em branco'
      },
      (err, user, info) => {
        if (err) return next(err)
        if (!user) return res.status(400).send({ user, info })

        return req.logIn(user, error => {
          if (error) return next(err)
          return res.send({ user, info })
        })
      }
    )(req, res, next)
  })

  app.get('/auth/logout', (req, res) => {
    req.logout()
    res.send(req.user)
  })
}
