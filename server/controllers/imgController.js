var db = require('./../config/db');
var path = require('path')

module.exports = {
  fetch: function (req, res) {
    var username  = req.headers.username;

    db.raw(`select idusers from users where username = '${username}'`)
      .then(function (results) {
        var userID = results[0][0].idusers;

        db.raw(`SELECT * FROM IMAGES WHERE userid = ${userID}`)
          .then(function (results) {

          var data = results[0];
            res.status(200).send(data)
            
        })
      })
  },
  upload: function (req, res) {
    var username  = req.headers.username;
    var front = req.files.front[0].originalname;
    var back = req.files.back[0].originalname
    console.log(front)
    db.raw(`select idusers from users where username = '${username}'`)
      .then(function (results) {
        var userID = results[0][0].idusers;
        db.raw(`INSERT INTO images values (null, '${front}', '${`${username} ${front}`}',
        null, null, '${back}', '${`${username} ${back}`}', ${userID} )`).then(function () {
          res.sendStatus(200)
        })
      })
  },

  serve: function (req, res) {
    var location = path.join(__dirname, '../uploads')

     var imgUser = req.params.imgurl.split(' ')[0];

     var imgname = req.params.imgurl;
    // if(imgUser === req.headers.username) {
       res.sendFile(`${location}/${imgname}`)
     //} else {
      // res.status(401).send('Not Allowed');
     //}
  }
};