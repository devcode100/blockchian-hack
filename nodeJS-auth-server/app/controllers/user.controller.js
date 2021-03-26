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
    requirement: reqest.body.requirement,
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
