const NFTBlocks = artifacts.require("NFTBlocks");

module.exports = async function(deployer) {
  await deployer.deploy(NFTBlocks);
};

