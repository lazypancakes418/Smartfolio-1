var db = require('./../config/db');
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jwt-simple');

module.exports = {
  signin: function (req, res) {
    db.raw(`SELECT username, password from smartfolio.users where username = '${req.body.username}'`)
      .then(function (result) {
        if (result[0][0]) {
          bcrypt.compare(req.body.password, result[0][0].password, function (err, isMatch) {
            if (err) {
              console.log('Error comparing hashed passwords')
            }
            if (isMatch) {
              var token = jwt.encode(result[0][0], 'secret');
              res.status(200).json(token);
            } else {
              res.status(401).send('Incorrect Password');
            }

          })
        } else {
          res.status(400).send('User does not exist. Please Register.');
        }
      })
  },

  register: function (req, res) {
    db.raw(`SELECT username from smartfolio.users where username = '${req.body.username}'`)
      .then(function (results) {
        if (!!results[0][0]) {
          res.status(401).send('user already exist')
        } else {
          bcrypt.hash(req.body.password, null, null, function (err, hash) {
            var hashPassword = hash
            if (err) {
              return console.log('Error hashing ' + err);
            }
            console.log('here', results)
            db.raw(`INSERT INTO smartfolio.users VALUES (NULL, '${req.body.username}', '${hash}');`)
              .then(function (results) {
                var username = req.body.username
                var password = hashPassword
                var user = {
                  username,
                  password
                }
                var token = jwt.encode(user, 'secret');
                res.status(200).json(token);
              })
          })
        }
      })
  }
}