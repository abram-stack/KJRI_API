const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add name']
  },
  jabatan: {
    type: String,
    required: [true, 'Please add jabatan']
  },
  pangkat: {
    type: String,
    required: [true, 'Please add pangkat']
  },
  address: {
    type: String
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project'
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
