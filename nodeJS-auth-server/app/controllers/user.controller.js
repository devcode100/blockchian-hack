const db = require('../models');
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
