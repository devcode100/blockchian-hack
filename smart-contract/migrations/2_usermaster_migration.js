const UserMaster = artifacts.require('UserMaster');

module.exports = function (deployer) {
  deployer.deploy(UserMaster);
};
