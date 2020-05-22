const fs = require('fs');
const ethers = require('ethers');
require('dotenv').config();

const privateKey = new Buffer(process.env.PRIVATE_KEY, 'hex');
const build = JSON.parse(fs.readFileSync('../ledger/build/contracts/Certificate.json', 'utf8'));
const abi = build.abi;
const provider = new ethers.providers.InfuraProvider(process.env.NETWORK_NAME,process.env.INFURA_API_KEY);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, provider);
const wallet = new ethers.Wallet(privateKey, provider);    
const contractWithSigner = contract.connect(wallet);

module.exports = contractWithSigner;
