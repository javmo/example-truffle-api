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
    })


module.exports = {
    provider
};