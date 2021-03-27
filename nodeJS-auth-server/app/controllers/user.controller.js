const db = require('../models');
const ipfsAPI = require('ipfs-api');
const formidable = require('formidable');
const readChunk = require('read-chunk');
const fs = require('fs');
const User = db.user;
const RequestRelief = db.requestrelief;

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.');
};

exports.getUser = (req, res) => {
  User.findOne({ id: req.query.id })
    .populate('roles', '-__v')
    .exec((err, user) => {
      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
      }
      if (err) {
        res.status(200).send(err);
      } else {
        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          roles: authorities,
        });
      }
    });
};

exports.saveRequestRelief = (reqest, response) => {
  const reliefRequest = new RequestRelief({
    state: reqest.body.state,
    userId: reqest.body.userId,
    district: reqest.body.district,
    email: reqest.body.email,
    typeOfCalamity: reqest.body.typeOfCalamity,
    shortDesc: reqest.body.shortDesc,
    requirement: reqest.body.requirement,
    currentRelief: reqest.body.currentRelief,
    createdDate: reqest.body.createdDate,
    severity: reqest.body.severity,
    phoneNumber: reqest.body.phoneNumber,
    expectedDelivery: reqest.body.expectedDelivery,
    userIdMapped: reqest.body.userIdMapped,
    status: reqest.body.status,
  });

  reliefRequest.save((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    response.status(200).send({
      id: data.id,
      message: 'Relief Request Raised Successfully!',
    });
  });
};

exports.getAllReliefRequests = (request, response) => {
  RequestRelief.find({}, function (err, reliefRequestList) {
    if (err) {
      response.status(500).send({ message: err });
    }
    response.status(200).send(reliefRequestList);
  });
};

exports.updateRequestStatus = (request, response) => {
  const requestId = request.params.id;
  const updatedStatus = request.params.status;
  const userMappedId = request.params.mappedId;

  RequestRelief.findByIdAndUpdate(
    { _id: requestId },
    { $set: { status: updatedStatus, userIdMapped: userMappedId } },
    { new: true },
    function (err, updatedObject) {
      if (err) {
        response.status(500).send({ message: err });
      }
      response.status(200).send(updatedObject);
    }
  );
};

exports.updateRequestStatusAndPhoto = (request, response) => {
  const requestId = request.params.id;
  const updatedStatus = request.params.updatedStatus;
  const userMappedId = request.params.mappedId;
  const helpPhotoHash = request.params.reliefPhotoHash;

  RequestRelief.findByIdAndUpdate(
    { _id: requestId },
    {
      $set: {
        status: updatedStatus,
        userIdMapped: userMappedId,
        helpGoodsPhotoHash: helpPhotoHash,
      },
    },
    { new: true },
    function (err, updatedObject) {
      if (err) {
        response.status(500).send({ message: err });
      }
      response.status(200).send(updatedObject);
    }
  );
};

exports.updateReceivedStatusAndPhoto = (request, response) => {
  const requestId = request.body.id;
  const updatedStatus = request.body.updatedStatus;
  const userMappedId = request.body.userMappedId;
  const notes = request.body.notes;
  const receivedGoodsPhotoHash = request.body.receivedGoodsPhotoHash;
  const goodsReceivedDate = request.body.goodsReceivedDate;

  RequestRelief.findByIdAndUpdate(
    { _id: requestId },
    {
      $set: {
        status: updatedStatus,
        userIdMapped: userMappedId,
        notes: notes,
        receivedGoodsPhotoHash: receivedGoodsPhotoHash,
        goodsReceivedDate: goodsReceivedDate,
      },
    },
    { new: true },
    function (err, updatedObject) {
      if (err) {
        response.status(500).send({ message: err });
      }
      response.status(200).send(updatedObject);
    }
  );
};

exports.getMyRequests = (request, response) => {
  const requestId = request.params.id;
  RequestRelief.find({
    $or: [{ userId: requestId }, { userIdMapped: requestId }],
  }).exec(function (err, filteredData) {
    if (err) {
      response.status(500).send({ message: err });
    }
    response.status(200).send(filteredData);
  });
};

exports.saveFileToIPFS = (request, response) => {
  const ipfs = ipfsAPI('localhost', '5001', { protocol: 'http' });
  let testFile = fs.readFileSync(
    'C:\\Users\\aruna\\Desktop\\Supply-Chain-Logistics.jpg'
  );
  let testBuffer = new Buffer.from(testFile);
  ipfs.files.add(testBuffer, function (err, file) {
    if (err) {
      response.status(500).send({ message: err });
    }
    response.status(200).send(file);
  });
};

exports.getileFromIPFS = (request, response) => {
  const ipfs = ipfsAPI('localhost', '5001', { protocol: 'http' });
  console.log('request.query.hash ', request.params.hash);
  ipfs.files.get(request.params.hash, function (err, file) {
    if (err) {
      response.status(500).send({ message: err });
    }

    response.status(200).send(file[0]);
  });
};

exports.uploadFile = (request, response) => {
  const ipfs = ipfsAPI('localhost', '5001', { protocol: 'http' });
  let bufferData = new Buffer.from(request.files.file.data);
  ipfs.files.add(bufferData, function (err, fileData) {
    if (err) {
      response.status(500).send({ message: err });
    }
    response.status(200).send(fileData);
  });
};
