var ChartOfAccounts = artifacts.require("ChartOfAccounts");

module.exports = function(deployer) {
  deployer.deploy(ChartOfAccounts);
};