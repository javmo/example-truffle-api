const logger = require('../services/logger');
const TruffleContract = require("truffle-contract");
const { provider, web3, getGenesisAddress } = require("../services/web3Config");



// Carga el archivo JSON del contrato compilado
const ChartOfAccountsJSON = require("../../build/contracts/ChartOfAccounts.json");
const DoubleEntryJSON = require("../../build/contracts/DoubleEntry.json");
const AccountJSON = require("../../build/contracts/Account.json");

const ChartOfAccounts = TruffleContract(ChartOfAccountsJSON);
const DoubleEntry = TruffleContract(DoubleEntryJSON);
const Account = TruffleContract(AccountJSON);

DoubleEntry.setProvider(provider);

Account.setProvider(provider);

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

const getAccount = async (req, res) => {
    try {
        const { name, owner } = req.body;

        const instance = await DoubleEntry.deployed();
        const contractAddressAccount = await instance.accounts(name ,{ from: owner });
        let specificInstance = await Account.at(contractAddressAccount);


        // funionces del smart contract Account
        const result2 = await specificInstance.accountName.call({ from: owner });
        const balance = await specificInstance.balance.call({from: owner})
        const result = { 
            name: result2,
        balance: balance 
    };


        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }

}

const addAccount = async (req, res) => {
    try {
        const { name, owner } = req.body;

        const instance = await DoubleEntry.deployed();
        const result = await instance.createAccount(name ,{ from: owner });
        

        res.status(201).send(result);
    } catch (error) {
        logger.error(`:fire: Error al interactuar con el contrato ${error}`);
        res.status(500).send(`Error al interactuar con el contrato ${error}`);
    }
};

module.exports = {
    getAccounts,
    addAccount,
    getAccount
}