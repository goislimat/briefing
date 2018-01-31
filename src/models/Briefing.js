const mongoose = require('mongoose')

const BriefingSchema = mongoose.Schema({
  description: String,
  title: { type: String, required: true }
})

module.exports = mongoose.model('briefings', BriefingSchema)
