const NgoRegistration = artifacts.require('NgoRegistration');

module.exports = function (deployer) {
  deployer.deploy(NgoRegistration);
};
