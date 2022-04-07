require("babel-register");
require("babel-polyfill");


// const HDWalletProvider = require("truffle-hdwallet-provider");
// require('dotenv').config();
// const HDWalletProvider = require("truffle-hdwallet-provider");

var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "gown sail must stay guitar blush account trade tuition warm eye disease";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
    },
    ropsten: {
      networkCheckTimeout: 1000000, 
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/989e80a91a844a51ac09c5e1dc04b7d5"),
      network_id: 3,       // Ropsten's id 
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
      },
    // "ropsten-infura": {
		// 	provider: () => new HDWalletProvider(process.env.TEST_MNEMONIC, "https://ropsten.infura.io/"+process.env.INFURA_KEY, 0),
		// 	network_id: 3,
		// 	gas: 4700000,
		// 	gasPrice: 100000000000
		// }
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      version: "0.8.10",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  plugins: ['truffle-plugin-verify'], //PLUGIN ADDED HERE
  api_keys: {
    etherscan: 'IHXYVKG4R6N2MHBEFW6K1UR1UZ8DX8ED3K'
  }
};
