const router = require('express').Router();
const boom = require('boom');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const asyncMiddleware = require('../../errorHandler/asyncMiddleware');
const queries = require('../../models/queries');
const authMiddleware = require('../auth/authMiddleware');
const createPollSchema = require('../../validation/createPollValidation');

router.get('/', asyncMiddleware(async (req, res) => {
  const polls = await queries.getAllPolls();
  if (!polls) throw boom.notFound('Could  not fetch polls');
  return res.status(200).json(polls);
}));

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


module.exports = router;