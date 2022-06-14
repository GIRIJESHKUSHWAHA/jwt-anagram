const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  role: {
    type: String,
    default: 'user',
    minlength: 2,
    maxlength: 50
  },
});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, role: this.role }, config.get('jwtPrivateKey'));
  return token;
}

const Users = mongoose.model('User', userSchema);
exports.Users = Users;