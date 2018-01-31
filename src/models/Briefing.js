const mongoose = require('mongoose')

const SectionSchema = require('./Section')

const BriefingSchema = mongoose.Schema({
  description: String,
  title: { type: String, required: true },
  // Just pass this as an array of sections
  sections: [SectionSchema]
})

module.exports = mongoose.model('briefings', BriefingSchema)
