const fs = require('fs');
const Web3 = require('web3');
const util = require('ethereumjs-util');
const wallet = require('eth-lightwallet');
const Tx = require('ethereumjs-tx').Transaction;
const txutils = wallet.txutils;

const web3 = new Web3(
    new Web3.providers.HttpProvider('http://127.0.0.1:7545')
);

const authorized_address = '0xd0996BBbE8793Ec1D1A5d83b50AD6f57B62D3536';
const private_key = new Buffer('a1f0f87f714962ee8c604df42d00f0241b68ae02de03f8ad6c2e1c5bbfd142d5', 'hex');
const contract_address = '0xCb382b682aae3ff818fA246CEa1Efa435735dE48';
const contract_build = JSON.parse(fs.readFileSync('./ledger/build/contracts/Certificate.json', 'utf8'));
const abi = contract_build.abi;

exports.getProject = async (projectId)=> {

    const txCount = await web3.eth.getTransactionCount(authorized_address);
    // Create and send transaction
    const txOptions = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(30000),
        gasPrice: web3.utils.toHex(20000000000),
        to: contract_address
    }

    var tx = new Tx(txutils.functionTx(abi, 'getProject', [projectId], txOptions));
    tx.sign(private_key);

    const serializedTx = `0x${tx.serialize().toString('hex')}`;

    const result = await web3.eth.sendSignedTransaction(serializedTx);
    
    console.log(result);
}
