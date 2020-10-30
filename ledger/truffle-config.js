const HDWalletProvider = require("truffle-hdwallet-provider");


const CHELO_MNENOMIC="audit pig aspect vague bird journey such knife sauce seat bachelor advice"
const CHELO_INFURA_API_KEY="3223453cb1bc41d3ab1eb1c452c09722"

require('dotenv').config()  // Store environment-specific variable from '.env' to process.env

module.exports = {
  
  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  contracts_build_directory: '../server/contracts',
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    // testnets
    // properties
    // network_id: identifier for network based on ethereum blockchain. Find out more at https://github.com/ethereumbook/ethereumbook/issues/110
    // gas: gas limit
    // gasPrice: gas price in gwei
    ropsten: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY),
      network_id: 3,
      gas: 8000000,
      gasPrice: 10000000000,
      timeoutBlocks: 4000
    },
    kovan: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://kovan.infura.io/v3/" + process.env.INFURA_API_KEY),
      network_id: 42,
      gas: 8000000,
      gasPrice: 10000000000
    },
    rinkeby: {
      provider: () => new HDWalletProvider(CHELO_MNENOMIC, "https://rinkeby.infura.io/v3/" + CHELO_INFURA_API_KEY),
      network_id: 4,
      gas: 8000000,
      gasPrice: 10000000000
    },
    // main ethereum network(mainnet)
    main: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://mainnet.infura.io/v3/" + process.env.INFURA_API_KEY),
      network_id: 1,
      gas: 8000000,
      gasPrice: 10000000000
    }
  }
};
