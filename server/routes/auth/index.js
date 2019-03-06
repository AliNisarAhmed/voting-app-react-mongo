const express = require('express');
const asyncMiddleware = require('../../errorHandler/asyncMiddleware');
const Joi = require('joi');
const boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const queries = require('../../models/queries');

const registerUserSchema = require('../../validation/registerUserValidation');
const loginUserSchema = require('../../validation/loginUserValidation');

const router = express.Router();

// POST + Register a new User

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

 if (!newUser) throw boom.badImplementation('user could not be created');

 return res.status(200).json({ username: newUser.username, email: newUser.email });

}));

// POST - Login a user

router.post('/login', asyncMiddleware(async (req, res) => {
  const { error, value } = Joi.validate(req.body, loginUserSchema);

  console.log(req.body);

  if (error) throw boom.badRequest(error.details[0].message);

  const user = await queries.findUserByEmail(value.email);
  if (!user) throw boom.badRequest("something wrong with request");

  const pwdIsValid = await bcrypt.compare(value.password, user.password);
  if (!pwdIsValid) throw boom.badRequest('something wrong with request');

  const payload = {
    username: user.username,
    email: user.email,
    id: user._id
  };

  jwt.sign(payload, process.env.SECRET_FOR_TOKEN, {
    expiresIn: 86400 // one day
  }, (err, token) => {
    if (err) throw boom.badImplementation('unable to generate token');
    return res.status(200).json({ auth: true, token: "Bearer " + token });
  });

}));

module.exports = router;