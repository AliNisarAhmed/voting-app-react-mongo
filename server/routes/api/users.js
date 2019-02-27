const router = require('express').Router();
const boom = require('boom');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;

const asyncMiddleware = require('../../errorHandler/asyncMiddleware');
const authMiddleware = require('../auth/authMiddleware');
const queries = require('../../models/queries');

// GET - /api/users/:userId - details of a prticular user, authorization required 

router.get('/:userId', authMiddleware, asyncMiddleware( async(req, res) => {
  const { userId } = req.params;
  if (!ObjectId.isValid(userId)) throw boom.badRequest('User does not exist');
  const user = await queries.findUserByIdAndPopulate(userId);
  if (!user) throw boom.serverUnavailable('Something went wrong');
  return res.status(200).json(user);
}));

module.exports = router;