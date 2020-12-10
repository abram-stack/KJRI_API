const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const connection = mongoose.createConnection(process.env.MONGO_URI)

autoIncrement.initialize(connection);

const StatementsSchema = new mongoose.Schema({
  statement: {
    type: String,
    enum : ['SUKET']
  },
  archive: {
    type: String
  },
  createdAtMo: {
    type: Date,
    default: Date.now()
  },
  createdAtYear: {
    type: Date,
    default: Date.now()
  },
  place: {
    type: String,
    enum: ['FRA']
  },
  subjek: String,
  customID: String
});

StatementsSchema.plugin(autoIncrement.plugin, {model: 'Statement', startAt: 1});
module.exports = mongoose.model('Statement', StatementsSchema);