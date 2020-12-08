const mongoose = require ('mongoose')

const ReportSchema = new mongoose.Schema({
  customID: String,
  typeOfMail: {
    type: String,
    enum: ['PEN']
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
  place: {
    type: String,
    enum: ['FRA']
  }
});

module.exports = mongoose.model('Report', ReportSchema);