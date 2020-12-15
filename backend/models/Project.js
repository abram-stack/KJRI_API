const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title : {
    type: String,
    required: [true, 'Please add title']
  },
  description: {
    type: String,
    required: [true, 'Please add description']  
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
  }
  ]
});


module.exports = mongoose.model('Project',projectSchema);