const Joi = require('joi');

const createPollSchema = Joi.object().keys({
  name: Joi.string().required().min(1),
  options: Joi.array().items(Joi.string().min(1)).required()
});

module.exports = createPollSchema;