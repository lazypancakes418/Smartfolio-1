var db = require('../config/db');
var path = require('path');
var fs = require('fs');

module.exports = {
  fetch: function(req, res) {
    // fetch all albums that has been shared with user
    var username = req.headers.username;
    var data = [];
    db.raw(`SELECT idusers FROM smartfolio.users WHERE username = '${username}'`)
    .then(function(userInfo) {
      var userID = userInfo[0][0].idusers;
      db.raw(`SELECT * FROM smartfolio.shared WHERE shareUserid = '${userID}'`)
      .then(function(sharedinfo) {
        if(sharedinfo[0].length === 0) {
          res.status(404).send(sharedinfo[0]);
        } else {
          sharedinfo[0].forEach(function(shared, index) {
            db.raw(`SELECT * FROM smartfolio.albums WHERE idalbums=${shared.albumid}`) // need to write a comment here to explain the query string
            .then(function(albuminfo) {
              shared['name'] = albuminfo[0][0].name;
              shared['description'] = albuminfo[0][0].description;
              db.raw(`SELECT * FROM smartfolio.album_image WHERE albumID=${albuminfo[0][0].idalbums}`)
              .then(function(imagesObj) {
                var images = imagesObj[0];
                shared['images'] = [];
                // shared['images'] = images.map(function(image) {
                //   return image.imageID;
                // });
                images.forEach(function(image) {
                  db.raw(`SELECT * FROM smartfolio.images WHERE idimages=${image.imageID}`)
                  .then(function(result) {
                    var obj = { imageId: image.imageID };
                    obj['imghash'] = result[0][0].imghash;
                    obj['imgname'] = result[0][0].imgname;
                    shared['images'].push(obj);
                    if(images.length === shared['images'].length) {
                      data.push(shared);
                      if(data.length === sharedinfo[0].length) {
                        res.status(200).send(data);
                      }
                    }
                  })
                })
                // data.push(shared);
                // if(data.length === sharedinfo[0].length) {
                //   res.status(200).send(data);
                // }
              })
            })
          })
        }
      })
    })
  },

  getUserId: function(req, res) {
    var username = req.headers.username;
    var shareUser = req.params.user;

    db.raw(`SELECT * FROM smartfolio.users WHERE username = '${shareUser}'`)
    .then(function(userInfo) {
      if(userInfo[0].length === 0) {
        res.status(404).send('User Not Found');
      } else {
        var userID = userInfo[0][0].idusers;
        res.status(200).send(userID.toString());
      }
    })
  },

  share: function(req, res) {
    // serve up a specific album that the user designates
    var username = req.headers.username;
    var albumID = req.body.albumId;
    var shareUsers = req.body.shareUsers; // expecting and array of userIds
    var permission = req.body.permission || 'read'; // TODO: Refactor share route to look for a permission for each user
    var count = 0;
    if(shareUsers.length > 0) {
      db.raw(`SELECT idusers FROM smartfolio.users WHERE username='${username}'`)
      .then(function(userInfo) {
        var userID = userInfo[0][0].idusers;
        shareUsers.forEach(function(user) {
          db.raw(`INSERT INTO smartfolio.shared values (null, ${userID}, ${albumID}, ${user}, "${permission}")`)
          .then(function() {
            count++
            if(count === shareUsers.length) {
              res.status(200).send('Successfully shared ablum');
            }
          })
        });
      })
    } else {
      res.status(404).send('Could not detect users to share content with')
    }
  },

  getSharedList: function(req, res) {
    var albumID = req.params.albumid;
    var list = [];

    db.raw(`SELECT * FROM smartfolio.shared WHERE albumid = '${albumID}' `)
    .then(function(sharedInfo) {
      var sharedGroup = sharedInfo[0];
      sharedGroup.forEach(function(user) {
        db.raw(`SELECT * FROM smartfolio.users WHERE idusers = '${user.shareUserid}' `)
        .then(function(result) {
          user['username'] = result[0][0].username;
          list.push(user);
          if(list.length === sharedGroup.length) {
            res.status(200).send(list);
          }
        })
      });
    })
  },

  remove: function(req, res) {
    var username = req.headers.username;
    var albumID = req.body.albumId;
    var sharedUserID = req.body.sharedUserId;

    db.raw(`DELETE FROM smartfolio.shared WHERE albumid=${albumID} AND shareUserid=${sharedUserID}`)
    .then(function() {
      res.sendStatus(200);
    })
  }
};
