const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

require('./src/services/passport')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URL)

// Initialize the app
const app = express()

const origin =
  process.env.NODE_ENV === 'production'
    ? 'https://superlua-deploy-graphql.herokuapp.com/'
    : 'http://localhost:3000'

app.use(
  cors({
    origin,
    credentials: true
  })
)

app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
)

require('./src/endpoints')(app)

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.listen(process.env.PORT, () => {
  console.log(
    `Go to http://localhost:${process.env.PORT}/graphiql to run queries!`
  )
})
