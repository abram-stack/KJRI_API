const mongoose = require('mongoose')
const slugify = require('slugify')

const ArchiveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add archive'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 Characters']
  },
  slug: String,
  acronym: {
    type: String,
    required: [true, 'Please add acronym'],
    maxlength: [3, 'Only 3 Characters']
  }
});

// Mongoose middleware
// create archieve slug from name
ArchiveSchema.pre('save', function (){
  this.slug = slugify(this.name, {lower: true});
  next();
});

module.exports = mongoose.model('Archive', ArchiveSchema);