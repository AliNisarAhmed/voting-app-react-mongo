const boom = require('boom');

function asyncMiddleware (f) {
  return function (req, res, next) {
    Promise.resolve(f(req, res, next).catch(err => {
      if (!err.isBoom) {
        return next(boom.badImplementation(err));
      }
      next(err);
    }));
  }
}

module.exports = asyncMiddleware;