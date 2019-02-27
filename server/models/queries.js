const User = require('./User');
const Poll = require('./Poll');
const Vote = require('./Vote');

function findUserByUsername (username) {
  return User.findOne({ username }).exec();
}

function findUserByEmail (email) {
  return User.findOne({ email }).exec();
}

function findUserById (id) {
  return User.findById(id).exec();
}

function createUser (userObj) {
  return User.create(userObj);
}

function findByUserNameAndDelete (username) {
  return User.findOneAndDelete({username}).exec();
}

function getAllPolls () {
  return Poll.find({}).exec();
}

function createPoll (pollObj) {
  return Poll.create(pollObj);
}

function findPollById(pollId) {
  return Poll.findById(pollId).populate('votes').exec();
}

function createVote(voteObj) {
  return Vote.create(voteObj);
}

function updatePollWithVote(pollId, voteId) {
  return Poll.findByIdAndUpdate(pollId, {$push: { 'votes': voteId }}, {upsert: true} );
}

function updateUserWithVote(userId, voteId) {
  return User.findByIdAndUpdate(userId, {$push: { 'votes': voteId }}, {upsert: true} );
}

function findVoteByUserId (user, poll) {
  return Vote.findOne({user, poll}).exec();
}

function findVoteByIP (ip, poll) {
  return Vote.findOne({ip, poll}).exec();
}

function deletePoll (pollId) {
  return Poll.findByIdAndRemove(pollId).exec();
}

function findUserByIdAndPopulate(userId) {
  return User.findById(userId).populate('polls').populate('votes').exec();
}


module.exports = {
  findUserByUsername,
  findUserByEmail,
  createUser,
  getAllPolls,
  createPoll,
  findByUserNameAndDelete,
  findPollById,
  createVote,
  updatePollWithVote,
  updateUserWithVote,
  findUserById,
  findVoteByUserId,
  findVoteByIP,
  deletePoll,
  findUserByIdAndPopulate,
}
