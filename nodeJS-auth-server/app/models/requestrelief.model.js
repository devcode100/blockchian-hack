const mongoose = require('mongoose');

const RequestRelief = mongoose.model(
  'RequestRelief',
  new mongoose.Schema({
    state: String,
    userId: String,
    district: String,
    email: String,
    typeOfCalamity: String,
    shortDesc: String,
    currentRelief: String,
    requirement: String,
    severity: String,
    phoneNumber: String,
    createdDate: String,
    expectedDelivery: String,
    userIdMapped: String,
    status: String,
    notes: String,
    helpGoodsPhotoHash: String,
    receivedGoodsPhotoHash: String,
    goodsReceivedDate: String,
  })
);

module.exports = RequestRelief;
