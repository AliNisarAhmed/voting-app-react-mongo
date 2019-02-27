const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  poll: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
    required: true,
  },
  poll_name: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  option: {
    type: String,
    required: true,
  },
});

const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;