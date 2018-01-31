const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  order: Number,
  questionText: { type: String, required: true },
  reason: String,
  // required: { type: Boolean, default: false },
  tip: String,
  type: { type: Number, required: true },
  visible: { type: Boolean, default: true },
  // Just pass a valid Section id
  _section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
});

module.exports = mongoose.model('questions', QuestionSchema);
