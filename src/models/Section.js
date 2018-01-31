const mongoose = require('mongoose')

const SectionSchema = mongoose.Schema({
  description: String,
  title: { type: String, required: true }
})

module.exports = mongoose.model('sections', SectionSchema)
