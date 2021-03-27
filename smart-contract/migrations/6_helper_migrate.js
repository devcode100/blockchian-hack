const HelperContract = artifacts.require('HelperContract');

module.exports = function (deployer) {
  deployer.deploy(HelperContract);
};
