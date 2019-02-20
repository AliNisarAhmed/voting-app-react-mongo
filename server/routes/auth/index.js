const express = require('express');
const asyncMiddleware = require('../../errorHandler/asyncMiddleware');
const Joi = require('joi');
const boom = require('boom');
const bcrypt = require('bcrypt');

const queries = require('../../models/queries');

const registerUserSchema = require('../../validation/registerUserValidation');

const router = express.Router();

router.post('/register', asyncMiddleware(async (req, res) => {
  const { error, value } = Joi.validate(req.body, registerUserSchema);
  if (error) throw boom.badRequest(error.details[0].message);
  
  const seacrh1 = await queries.findUserByUsername(value.username);
  const search2 = await queries.findUserByEmail(value.email);
  if (seacrh1) {
    throw boom.badRequest("username already exists");
  } else if (search2) {
    throw boom.badRequest("email already exists");
  }

 const hashedPwd = await bcrypt.hash(value.password, 10);

 let newUser = await queries.createUser({
   username: value.username,
   email: value.email,
   password: hashedPwd,
 });

 if (!newUser) throw boom.badImplementation('User could not be created');

 return res.status(200).json({ username: newUser.username, email: newUser.email });

}));

router.post('/login', asyncMiddleware((req, res) => {
  
}));

module.exports = router;