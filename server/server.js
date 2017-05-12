var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var multer = require('multer');
var bcrypt = require('bcrypt-nodejs');
var path = require('path');
var watson = require('./api/watson');
var app = express();

//Multer Methods
var imglocation = path.join(__dirname,'uploads');
var storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, imglocation);
  },
  filename: function (req, file, cb){
    bcrypt.hash(file.originalname, null, null, function (err, hash) {
      var string = `${req.headers.username} ${file.originalname}`
      cb(null, string)
    })
  }
})


var upload = multer({storage: storage}).fields([{
  name: 'front', maxcount: 1
}, {name: 'back', maxcount: 1}]);

//End Multer Methods
app.use(bodyParser.json());
app.use(upload) //Multer Middleware

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/../client')));

app.use(express.static(path.join(__dirname, '/lib')));

require('./routes.js')(app, express);
var port = process.env.PORT || 8000;
setInterval(watson, 60000)
app.listen(port, function () {
  console.log('Listening on port ', port);
})


module.exports = app;
