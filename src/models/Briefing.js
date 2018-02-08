const mongoose = require('mongoose');

const Section = require('./Section');

const BriefingSchema = mongoose.Schema({
  description: String,
  title: { type: String, required: true },
});

BriefingSchema.pre('remove', async function (next) {
  const sections = await Section.where({ _briefing: this._id });

  sections.map(section => section.remove());
  next();
});

module.exports = mongoose.model('briefings', BriefingSchema);
