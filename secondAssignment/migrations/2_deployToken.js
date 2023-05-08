const MyContract = artifacts.require("SBETERC223");

module.exports = function (deployer) {
  deployer.deploy(MyContract);
};
