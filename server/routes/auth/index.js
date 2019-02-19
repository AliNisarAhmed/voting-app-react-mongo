const express = require('express');
const asyncMiddleware = require('../../errorHandler/asyncMiddleware');
const Joi = require('joi');
const boom = require('boom');

const registerUserSchema = require('../../validation/registerUserValidation');

const router = express.Router();

router.get('/register', asyncMiddleware(async (req, res) => {
  const { error, value } = Joi.validate(req.body, registerUserSchema);
  if (error) throw boom.badRequest(error);
  res.json(value);
}));

module.exports = router;