const Joi = require('joi');

const voteSchema = Joi.object().keys({
  userId: Joi.string().optional(),
  option: Joi.string().required().min(1),
});

module.exports = voteSchema;