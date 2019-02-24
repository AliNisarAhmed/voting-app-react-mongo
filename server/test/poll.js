const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const assert = chai.assert;
const jwt = require('jsonwebtoken');

const queries = require('../models/queries');

chai.use(chaiHttp);

describe('Testing /api/polls routes', () => {

  describe("POST - /api/polls/new - Create a new Poll", () => {

    it('Creates a new Poll with correct information', (done) => {
      const name = "TEST_POLL";
      const options = ["Option_1", "Option_2", "Option_3"];
      chai
        .request(server)
        .post('/api/auth/login')
        .send({ email: "test@test.com", password: "abc123"})
        .end((err, res) => {
          console.log(res.body.auth);
          console.log(res.body.token);
          const [, token] = res.body.token.split(' ');
          assert.equal(res.status, 200);
          chai
            .request(server)
            .post('/api/polls/new')
            .set("authorization", token)
            .set("Hello", "hello")
            .send({name, options})
            .end((err, response) => {
              console.log(response.body);
              assert.equal(response.status, 200);
              assert.isObject(response.body);
              assert.equal(response.body.name, name);
              done();
            })
        })
    });

  })

});