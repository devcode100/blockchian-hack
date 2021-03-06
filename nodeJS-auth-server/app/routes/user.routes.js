const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');
const fileUpload = require('express-fileupload');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });
  app.use(fileUpload());
  app.get('/api/test/all', controller.allAccess);

  app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard);

  app.get(
    '/api/test/mod',
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    '/api/test/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get('/api/get/user/:id', [authJwt.verifyToken], controller.getUser);

  app.post(
    '/api/post/relief-request',
    [authJwt.verifyToken],
    controller.saveRequestRelief
  );

  app.get(
    '/api/all/relief-requests',
    [authJwt.verifyToken],
    controller.getAllReliefRequests
  );

  app.put(
    '/api/update/relief-requests-status/:id/:status/:mappedId',
    [authJwt.verifyToken],
    controller.updateRequestStatus
  );

  app.put(
    '/api/update/relief-requests-status-photo/:id/:status/:mappedId/:reliefPhotoHash',
    [authJwt.verifyToken],
    controller.updateRequestStatusAndPhoto
  );

  app.put(
    '/api/update/relief-received-status',
    [authJwt.verifyToken],
    controller.updateReceivedStatusAndPhoto
  );

  app.get(
    '/api/my/relief-requests/:id',
    [authJwt.verifyToken],
    controller.getMyRequests
  );
  app.get('/api/ipfs/save', [authJwt.verifyToken], controller.saveFileToIPFS);
  app.get(
    '/api/ipfs/get/:hash',
    controller.getileFromIPFS
  );

  app.post('/api/upload/file', [authJwt.verifyToken], controller.uploadFile);
};
