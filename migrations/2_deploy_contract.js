var NFToken = artifacts.require("NFToken");

module.exports = function(deployer) {
  deployer.deploy(NFToken);
};