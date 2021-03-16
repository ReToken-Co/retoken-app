const AuctionApp = artifacts.require("AuctionApp");

module.exports = function (deployer) {
// this contract has no constructors, if have, add them with , separator
    deployer.deploy(AuctionApp);
};