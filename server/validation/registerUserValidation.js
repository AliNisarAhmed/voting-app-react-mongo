const Joi = require('joi');

const registerUserSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  password2: Joi.string().valid(Joi.ref('password')).required().options({
    language: {
      any: {
        allowOnly: '!!Passwords do not match'
      }
    }
  }),
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
});

module.exports = registerUserSchema;