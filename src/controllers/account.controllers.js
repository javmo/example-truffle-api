const logger = require('../services/logger');
const TruffleContract = require("truffle-contract");
const { provider, web3, getGenesisAddress } = require("../services/web3Config");


// Carga el archivo JSON del contrato compilado
const ChartOfAccountsJSON = require("../../build/contracts/ChartOfAccounts.json");

const ChartOfAccounts = TruffleContract(ChartOfAccountsJSON);
ChartOfAccounts.setProvider(provider);

const getAccounts = async (req, res) => {
    // #swagger.tags = ['account']
    try {
        const instance = await ChartOfAccounts.deployed();
        const accounts = await instance.getAllAccounts.call(); // Reemplaza esto con el nombre de tu método
        
        const accountList = [];
        for (let i = 0; i < accounts.length; i++) {
            const { name, accountType, balance, description } = accounts[i];
            accountList.push({
                name: name,
                accountType: accountType,
                balance: balance.toString(),
                description: description
            });
        }

        res.send(accountList);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato  ${error}`);
        res.status(500).send(`Error al interactuar con el contrato  ${error}`);
    }
};

const addAccount = async (req, res) => {
    try {
        const { name, accountType, balance, description } = req.body;

        const instance = await ChartOfAccounts.deployed();
        const genesisAddress = await getGenesisAddress();
        const result = await instance.addAccount(name, accountType, balance, description, { from: genesisAddress });

        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};

module.exports = {
    getAccounts,
    addAccount
}