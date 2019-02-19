const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 1,
    required: true,
    unique: true
  }, 
  email: {
    type: String,
    minlength: 1,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  polls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
  }],
  votes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vote',
  }],
});

const User = mongoose.model('user', UserSchema);

module.exports = User;