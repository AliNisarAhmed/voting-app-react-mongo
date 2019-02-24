const router = require('express').Router();
const boom = require('boom');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const asyncMiddleware = require('../../errorHandler/asyncMiddleware');
const queries = require('../../models/queries');
const authMiddleware = require('../auth/authMiddleware');
const createPollSchema = require('../../validation/createPollValidation');
const voteSchema = require('../../validation/voteValidation');

const ObjectId = require('mongoose').Types.ObjectId;

// GET - All Polls
router.get('/', asyncMiddleware(async (req, res) => {
  const polls = await queries.getAllPolls();
  if (!polls) throw boom.notFound('Could  not fetch polls');
  return res.status(200).json(polls);
}));


// POST - Create a new Poll - secured Route
router.post('/new', authMiddleware, asyncMiddleware(async (req, res) => {
  const { error, value } = Joi.validate(req.body, createPollSchema);
  if (error) throw boom.badRequest('could not create poll with the information given');
  const poll = {
    name: value.name,
    creator: req.user.username,
    creator_id: req.user.id,
    options: value.options
  };
  const createdPoll = await queries.createPoll(poll);
  if (!createdPoll) throw boom.badImplementation('could not create poll');
  res.status(200).json(createdPoll);
}));

// GET - View details of a Poll 
router.get('/:pollId', asyncMiddleware(async (req, res) => {
  const { pollId } = req.params;
  if (!ObjectId.isValid(pollId)) throw boom.badRequest('Poll does not exist');
  const poll = await queries.findPollById(pollId);
  if (!poll) throw boom.badRequest('No such Poll exists');
  res.status(200).json(poll);
}))


// POST - casting a vote on a particular poll by a user 
router.post('/:pollId', asyncMiddleware(async (req, res) => {
  const { pollId } = req.params;
  // check if req.body is valid
  const { error, value } = Joi.validate(req.body, voteSchema);
  if (error) throw boom.badRequest(error);

  // validate User and Poll ObjectID
  if (value.userId) {
    if (!ObjectId.isValid(value.userId)) throw boom.badRequest('User does not exist');
  }
  if (!ObjectId.isValid(pollId)) throw boom.badData('Poll does not exist');
  

  if (value.userId) {  // if we have been provided a userId, we check if that userId is valid
    const user = await queries.findUserById(value.userId);
    if (!user) throw boom.badRequest('User does not exist');
  }
  // check if the pollId provided in the req.body belongs to a valid poll
  const poll = await queries.findPollById(pollId);
  if (!poll) throw boom.badRequest('Poll does not exist');
  // check if the poll has the option provided in the req.
  if (!poll.options.includes(value.option)) {
    throw boom.badRequest('No such option exists');
  }

  // find if this user or this ip has already voted on this poll

  if (value.userId) {
    let vote = await queries.findVoteByUserId(value.userId, poll._id );
    if (vote) throw boom.badRequest("You have already voted on this poll");
  } else {
    let vote = await queries.findVoteByIP(req.ip, poll._id);
    if (vote) throw boom.badRequest('You have already voted on this poll');
  }

  const vote = await queries.createVote({user: value.userId, poll: poll._id, ip: req.ip, option: value.option });
  if (!vote) throw boom.internal('Could not create vote');
  await queries.updatePollWithVote(poll._id, vote._id);
  if (value.userId) {
    await queries.updateUserWithVote(value.userId, vote._id);
  }
  res.status(200).json(vote);
}))


module.exports = router;