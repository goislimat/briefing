const mongoose = require('mongoose');

const SectionSchema = mongoose.Schema({
  description: String,
  title: { type: String, required: true },
  // Just pass a valid Briefing id
  _briefing: { type: mongoose.Schema.Types.ObjectId, ref: 'Briefing' },
});

module.exports = mongoose.model('sections', SectionSchema);
