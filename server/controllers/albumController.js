var db = require('../config/db');
var path = require('path');
var fs = require('fs');
var promise = require('bluebird');

module.exports = {
  fetch: function(req, res) {
    // fetch all albums belonging to the user
    var username = req.headers.username;
    var data = [];
    db.raw(`SELECT idusers FROM smartfolio.users WHERE username = '${username}'`)
    .then(function(userInfo) {
      var userID = userInfo[0][0].idusers;
      db.raw(`SELECT * FROM smartfolio.albums WHERE userID = '${userID}'`)
      .then(function(albuminfo) {
        albuminfo[0].forEach(function(album, index) {
          db.raw(`SELECT * FROM smartfolio.album_image WHERE albumID=${album.idalbums}`) // fetch all photo records that have a relationship with the album(s)
          .then(function(images) {
            // include all the photo information as a property of the data array that is sent back to client
            var actualImage = images[0];
            album['images'] = actualImage.map(function(imageID) {
              return imageID.imageId;
            });
            data.push(album);

            if(data.length === albuminfo[0].length) {
              res.status(200).send(data);
            }
          }).catch(function(err) {
            console.error('error selecting images:', err);
          })
        })
      }).catch(function(err) {
        console.error('error selecting albums:', err);
      })
    }).catch(function(err) {
      console.error('error selecting users:', err);
    })
  },

  serve: function(req, res) {
    // serve up a specific album that the user designates
  },

  upload: function(req, res) {
    // add a new album
    var username = req.headers.username;
    var albumName = req.body.albumInfo.album.albumName;
    var albumDescription = req.body.albumInfo.album.albumDescription;
    var images = req.body.photos.map(function(photo) {
      return photo.idimages;
    });
    console.log('here')

    // TODO: include catch statements at every layer of queries
    db.raw(`SELECT idusers FROM smartfolio.users WHERE username='${username}'`)
    .then(function (result) {
      var userID = result[0][0].idusers;
      db.raw(`INSERT INTO smartfolio.albums values (null, '${albumName}', '${albumDescription}', ${userID})`)
      .then(function(some) {
        db.raw(`SELECT MAX(idalbums) FROM smartfolio.albums`)
        .then(function(pKey) {
          var LAST_INSERT_ID = pKey[0][0]['MAX(idalbums)'];
          console.log('inside the array to get images', images);
          if(images) {
            images.forEach(function(image, index) {
              db.raw(`INSERT INTO smartfolio.album_image values (null, ${image}, ${LAST_INSERT_ID})`)
              .then(function() {
                if(index === images.length - 1) {
                  res.sendStatus(200);
                }
              })
            })
          } else {
            res.status(200).send('No images added to album');
          }
        })
      });
    });

  },

  update: function(req, res) {
    // update existing album name/description
    var username = req.headers.username;
    var albumID = req.params.album;
    var newName = req.body.albumName;
    var newDescription = req.body.albumDescription;

    db.raw(`UPDATE smartfolio.albums SET name='${newName}', description='${newDescription}' WHERE idalbums=${albumID}`)
    .then(function() {
      res.sendStatus(202);
    });
  },

  delete: function(req, res) {
    // delete a specified album
    var username = req.headers.username;
    var albumID = req.params.album;

    db.raw(`DELETE FROM smartfolio.albums WHERE idalbums=${albumID}`)
    .then(function() {
      res.sendStatus(200);
    })
  },

  addImgToAlbum: function(req, res) {
    // add an img to an album
  }
};
