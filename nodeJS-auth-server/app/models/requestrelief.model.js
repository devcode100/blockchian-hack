const mongoose = require('mongoose');

const RequestRelief = mongoose.model(
  'RequestRelief',
  new mongoose.Schema({
    state: String,
    userId:String,
    district: String,
    email: String,
    typeOfCalamity: String,
    requirement: String,
    severity: String,
    phoneNumber: String,
    expectedDelivery: String,
    userIdMapped: String,
    status: String,
  })
);

module.exports = RequestRelief;
