const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  poll: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
  },
  ip: {
    type: String,
    required: true,
  },
  option: {
    type: String
  }
});

const Vote = mongoose.model('vote', VoteSchema);

module.exports = Vote;