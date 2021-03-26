const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.role = require('./role.model');

db.ROLES = ['USER', 'TRANSPORT_AGENCY', 'NGO', 'LAW'];

module.exports = db;
