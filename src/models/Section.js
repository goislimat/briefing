const mongoose = require('mongoose');

const Question = require('./Question');

const SectionSchema = mongoose.Schema({
  description: String,
  title: { type: String, required: true },
  // Just pass a valid Briefing id
  _briefing: { type: mongoose.Schema.Types.ObjectId, ref: 'briefings' },
});

SectionSchema.pre('remove', function (next) {
  Question.remove({ _section: this._id }).exec();
  next();
});

module.exports = mongoose.model('sections', SectionSchema);
