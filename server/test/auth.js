const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const assert = chai.assert;
const jwt = require('jsonwebtoken');

const queries = require('../models/queries');

chai.use(chaiHttp);


describe('Testing Auth Routes', () => {

  describe('Testing Register Route - /api/auth/register', () => {    

    it('Registers the user successfully', (done) => {
      let username = "test";
      let password = "abc123";
      let password2 = "abc123";
      let email = "test@test.com";
      queries.findByUserNameAndDelete(username)
        .then(() => {
          chai.request(server)
            .post('/api/auth/register')
            .send({
              username, password, password2, email
            })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.isObject(res.body);
              assert.equal(res.body.username, username);
              assert.equal(res.body.email, email);
              done();
            })
        });
      })
      
    it('Does not Register the user if Passwords do not match', (done) => {
      let username = "test";
      let password = "ab123";
      let password2 = "abc123";
      let email = "test@test.com";
      queries.findByUserNameAndDelete(username)
        .then(() => {
          chai.request(server)
            .post('/api/auth/register')
            .send({
              username, password, password2, email
            })
            .end((err, res) => {
              assert.equal(res.status, 400);
              assert.equal(res.body.statusCode, 400);
              assert.equal(res.body.error, 'Bad Request');
              assert.equal(res.body.message, 'Passwords do not match');
              done();
            })
        });
    });
    
    it('Does not Register the user if Email is invalid', (done) => {
      let username = "test";
      let password = "abc123";
      let password2 = "abc123";
      let email = "test@test";
      queries.findByUserNameAndDelete(username)
        .then(() => {
          chai.request(server)
            .post('/api/auth/register')
            .send({
              username, password, password2, email
            })
            .end((err, res) => {
              assert.equal(res.status, 400);
              assert.equal(res.body.statusCode, 400);
              assert.equal(res.body.error, 'Bad Request');
              assert.equal(res.body.message, '"email" must be a valid email');
              done();
            });
        });
    });

  });

  describe('Testing Login Route', () => {

    it('Successfully logs in a User and a valid token is sent', (done) => {
      let username = "test";
      let password = "abc123";
      let password2 = "abc123";
      let email = "test@test.com";
      queries.findByUserNameAndDelete(username)
        .then(() => {
          chai.request(server)
            .post('/api/auth/register')
            .send({
              username, password, password2, email
            })
            .end((err, res) => {
              let loginCredentials = res.body;
              chai.request(server)
                .post('/api/auth/login')
                .send({ email, password })
                .end((err, response) => {
                  assert.equal(response.status, 200);
                  assert.isObject(response.body);
                  assert.equal(response.body.auth, true);
                  assert.isString(response.body.token);
                  let [ bearer, token ] = response.body.token.split(' '); 
                  assert.equal(bearer, 'Bearer');
                  let payload = jwt.verify(token, process.env.SECRET_FOR_TOKEN);
                  assert.isObject(payload);
                  assert.equal(payload.username, username);
                  assert.equal(payload.email, email);
                  done();
                });
            });
          });
    });

    it('Refuses Login if password is incorrect', (done) => {
      let username = "test";
      let password = "abc123";
      let password2 = "abc123";
      let email = "test@test.com";
      queries.findByUserNameAndDelete(username)
        .then(() => {
          chai.request(server)
            .post('/api/auth/register')
            .send({
              username, password, password2, email
            })
            .end((err, res) => {
              chai.request(server)
                .post('/api/auth/login')
                .send({ email, password: "ab123" })
                .end((err, response) => {
                  assert.equal(response.status, 400);
                  assert.equal(response.body.error, 'Bad Request');
                  assert.equal(response.body.message, 'something wrong with request');
                  done();
                });
            });
          });
    });
  
  });
    
});