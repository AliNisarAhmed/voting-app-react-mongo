const User = require('./User');
const Poll = require('./Poll');

function findUserByUsername (username) {
  return User.findOne({ username }).exec();
}

function findUserByEmail (email) {
  return User.findOne({ email }).exec();
}

function createUser (userObj) {
  return User.create(userObj);
}

function getAllPolls () {
  return Poll.find({}).exec();
}

function createPoll (pollObj) {
  return Poll.create(pollObj);
}

function findByUserNameAndDelete (username) {
  return User.findOneAndDelete({username}).exec();
}

module.exports = {
  findUserByUsername,
  findUserByEmail,
  createUser,
  getAllPolls,
  createPoll,
  findByUserNameAndDelete,
  
}