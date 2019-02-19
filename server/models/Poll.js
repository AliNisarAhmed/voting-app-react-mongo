const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  options: [{
    type: String,
    required: true,
  }],
});

const Poll = mongoose.model('poll', PollSchema);

module.exports = Poll;