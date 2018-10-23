var HDWalletProvider = require("truffle-hdwallet-provider");
var config = require('./config');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    live: {
      provider: new HDWalletProvider(config.mnemonic, "https://mainnet.infura.io/v3/" + config.apiKey),
      network_id: "1",
      gas: 6612388, // Gas limit used for deploys
      gasPrice: 5000000000, // 20 gwei
    },
    rinkeby: {
      provider: new HDWalletProvider(config.mnemonic, "https://rinkeby.infura.io/v3/" + config.apiKey),
      network_id: "4",
      gas: 5900000 // Gas limit used for deploys
    },
  }
}

