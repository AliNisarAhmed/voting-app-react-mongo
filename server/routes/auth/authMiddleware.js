const boom = require('boom');
const jwt = require('jsonwebtoken');

function authMiddleWare (req, res, next) {
  const bearerToken = req.headers['authorization'];
  if (!bearerToken) throw boom.unauthorized('you are not authorized');
  const [ , token] = bearerToken.split(' ');
  jwt.verify(token, process.env.SECRET_FOR_TOKEN, (err, decoded) => {
    if (err) throw boom.unauthorized(err.message);
    req.user = decoded;
    next();
  });
}

module.exports = authMiddleWare;