var uController = require('./controllers/userController.js');
var iController = require('./controllers/imgController.js');
var helper = require('./authenticator/authenticator');

module.exports = function (app, express) {
  app.post('/signin', uController.signin);
  app.post('/register/', uController.register);
  app.get('/photos', iController.fetch);
  app.post('/upload/photos',helper.decode, iController.upload);
  app.get('/photos/:imgurl', iController.serve)
//TODO: add helper.decode to /photos, /upload
  app.use(helper.errorLogger);
  app.use(helper.errorHandler);
}
