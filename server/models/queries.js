const User = require('./User');

function findUserByUsername (username) {
  return User.findOne({ username }).exec();
}

function findUserByEmail (email) {
  return User.findOne({ email }).exec();
}

function createUser (userObj) {
  return User.create(userObj);
}

module.exports = {
  findUserByUsername,
  findUserByEmail,
  createUser,
}