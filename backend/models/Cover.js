const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const connection = mongoose.createConnection(process.env.MONGO_URI)

autoIncrement.initialize(connection);

const CoverSchema = new mongoose.Schema({
  customID: String,
  archive: {
    type: String
    // reference to other
  },
  createdAtMo:{
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

CoverSchema.plugin(autoIncrement.plugin, {model: 'Cover', startAt: 1});

module.exports = mongoose.model('Cover', CoverSchema);