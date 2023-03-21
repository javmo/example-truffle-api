const Web3 = require("web3");
const logger = require('../services/logger');


// Configura el proveedor de Web3 y la instancia del contrato
const web3 = new Web3(process.env.URI_PROVIDER);
const provider = new Web3.providers.HttpProvider(process.env.URI_PROVIDER);

web3.eth.getNodeInfo()
    .then(nodeInfo => {
        logger.info(`:rocket: Blockchain is connected, node: ${nodeInfo}`);
    })
    .catch(e => {
        logger.warn(`:no_entry:  Blockchain offline-` + e);
    });

// Se busca si hay una address en las variables de ambiente sino se usa la coinbase de la blockchain
const getGenesisAddress = () => {
    return web3.eth.getCoinbase()
      .then(address => {
        const genesisAddress = process.env.GENESIS_ADDRESS || address;
        logger.info(`:key: calling a contract with Genesis Address: ${genesisAddress}`);
        return genesisAddress;
      })
      .catch(e => {
        logger.warn(`:no_entry: Problem coinbase address-` + e);
        return null;
      });
  };


module.exports = {
    provider,
    getGenesisAddress
};