var uController = require('./controllers/userController.js');
var iController = require('./controllers/imgController.js');
var helper = require('./authenticator/authenticator');

module.exports = function (app, express) {
  app.post('/signin', uController.signin);
  app.post('/register/', uController.register);
  app.get('/photos',helper.decode, iController.fetch);
  app.post('/upload/photos',helper.decode, iController.upload);
  app.get('/photos/:imgurl', iController.serve);
  app.delete('/photos/:imgurl', helper.decode, iController.delete);
  //app.put for changing the front or back img
    //will this go to /photos or /upload/photos?
    //will need a method on iController for updating images
//TODO: add helper.decode to /photos, /upload
  app.use(helper.errorLogger);
  app.use(helper.errorHandler);
}
