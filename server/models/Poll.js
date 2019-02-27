const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  created_on: {
    type: Date,
    default: Date.now()
  },
  updated_on: {
    type: Date,
    default: Date.now(),
  },
  options: [{
    type: String,
    required: true,
  }],
  votes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vote'
  }],
});

const Poll = mongoose.model('Poll', PollSchema);

module.exports = Poll;