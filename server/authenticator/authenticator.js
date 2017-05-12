
var jwt = require('jwt-simple');

module.exports =  {
  errorLogger: function (err, req, res, next) {
    console.error(err.stack);
    next(err);
  },
  errorHandler: function (err, req, res, next) {
    res.status(500).send({error: err.message});
  },
  decode: function (req, res, next) {
    var token = req.headers['x-access-token'];
    var user;
    if(!token) {
      return res.sendStatus(403);
    }
    try {
      user = jwt.decode(token, 'secret');
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }
  }
}