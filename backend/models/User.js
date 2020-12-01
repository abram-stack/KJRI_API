const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const { reset } = require('nodemon');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true,'Please add an email'],
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Please add a valid email'
    ]
  },
  role: {
    type: String,
    enum: ['user','tu'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please add password'],
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpired: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next){
  // forgotpass scenario : //middleware is running, we are saving user, but we dont add pass,
  // : we dont modified, then next
  if(!this.isModified('password')){
    next();
  }

  //generate salt "genSalt" to hash the password, await promise function
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
};



// Method for matching user entered (plain)password to (hashed) password in db
UserSchema.methods.matchPassword = async function(enteredPassword){
  // bcrypt compare, return promise
  return await bcrypt.compare(enteredPassword, this.password);
};




// Method for generate hash token for reset password
UserSchema.methods.getResetPasswordToken = function(){
  // generate Token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // hash token and set it to resetPasswordToken
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // set expire
  this.resetPasswordExpired = Date.now() + 10 * 60 * 1000;

  // return the original token
  return resetToken;
}; 
module.exports = mongoose.model('User', UserSchema);