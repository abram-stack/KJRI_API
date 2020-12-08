const mongoose = require('mongoose');

const RegularSchema = new mongoose.Schema({
  customId: String,
  archive: {
    type: String,
    required: true
    // reference: archive schema
  },
  subjek: String,
  createdAtMo: {
    type: Date,
    default: Date.now
  },
  createdAtYear: {
    type: Date,
    default: Date.now
  },
  selectedFile: String
});

module.exports = mongoose.model('Regular', RegularSchema);