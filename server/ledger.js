const fs = require('fs');
const path = require('path');
const ethers = require('ethers');
require('dotenv').config();

const privateKey = new Buffer(process.env.PRIVATE_KEY, 'hex');
const filePath = path.join(__dirname,'contracts/Certificate.json');
const build = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const abi = build.abi;
const provider = new ethers.providers.InfuraProvider(process.env.NETWORK_NAME,process.env.INFURA_API_KEY);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, provider);
const wallet = new ethers.Wallet(privateKey, provider);    
contractWithSigner = contract.connect(wallet);
contractWithSigner.contract=contract;

module.exports = contractWithSigner;
