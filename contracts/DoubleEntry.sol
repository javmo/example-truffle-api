// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Account.sol";
import "./ResultAccount.sol";

contract DoubleEntry {
    address public owner;
    mapping(string => Account) public accounts;
    mapping(string => ResultAccount) public resultAccounts;
    Account public retainedEarningsAccount;

    // Array to store result account names
    string[] public resultAccountNames;

    Entry[] public entries;

    constructor() {
        owner = msg.sender;
        retainedEarningsAccount = new Account("Retained Earnings");
    }

    struct Entry {
        string debitAccount;
        string creditAccount;
        uint256 amount;
        uint256 timestamp;
  //      bytes32 transactionHash;
    }

    function createAccount(string memory _accountName) public {
        require(msg.sender == owner, "Only the owner can perform this action.");
        accounts[_accountName] = new Account(_accountName);
    }

    function createResultAccount(string memory _accountName, bool _isExpense)
        public
    {
        require(msg.sender == owner, "Only the owner can perform this action.");
        resultAccounts[_accountName] = new ResultAccount(
            _accountName,
            _isExpense
        );
    }

    function recordTransaction(
        string memory _debitAccountName,
        string memory _creditAccountName,
        uint256 _amount
    ) public {
        require(msg.sender == owner, "Only the owner can perform this action.");
        Account debitAccount = accounts[_debitAccountName];
        Account creditAccount = accounts[_creditAccountName];

        debitAccount.debit(_amount);
        creditAccount.credit(_amount);

 //       bytes32 transactionHash = getTransactionHash();

        entries.push(
            Entry({
                debitAccount: _debitAccountName,
                creditAccount: _creditAccountName,
                amount: _amount,
                timestamp: block.timestamp
        //        transactionHash: transactionHash
            })
        );
    }

    function recordResultTransaction(
        string memory _resultAccountName,
        string memory _balanceAccountName,
        uint256 _amount,
        bool isExpense
    ) public {
        require(msg.sender == owner, "Only the owner can perform this action.");
        ResultAccount resultAccount = resultAccounts[_resultAccountName];
        Account balanceAccount = accounts[_balanceAccountName];

        if (isExpense) {
            resultAccount.debit(_amount);
            balanceAccount.credit(_amount);
        } else {
            resultAccount.credit(_amount);
            balanceAccount.debit(_amount);
        }

      //  bytes32 transactionHash = getTransactionHash();

        entries.push(
            Entry({
                debitAccount: _resultAccountName,
                creditAccount: _balanceAccountName,
                amount: _amount,
                timestamp: block.timestamp
    //            transactionHash: transactionHash
            })
        );
    }

    function closeResultAccounts() public {
        require(msg.sender == owner, "Only the owner can perform this action.");

        uint256 totalExpenses = 0;
        uint256 totalRevenues = 0;

        for (uint256 i = 0; i < resultAccountNames.length; i++) {
            string memory accountName = resultAccountNames[i];
            ResultAccount resultAccount = resultAccounts[accountName];
            if (resultAccount.isExpense()) {
                totalExpenses += resultAccount.balance();
            } else {
                totalRevenues += resultAccount.balance();
            }
            resultAccount.resetBalance();
        }

        uint256 netIncome = totalRevenues - totalExpenses;
        retainedEarningsAccount.debit(netIncome);
    }

    function getTransactionHash() internal view returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    blockhash(block.number - 1),
                    msg.sender,
                    tx.gasprice,
                    block.timestamp
                )
            );
    }

    function getNumberOfEntries() public view returns (uint256) {
        return entries.length;
    }

    function getEntry(uint256 index) public view returns (Entry memory) {
        require(index < entries.length, "Index out of bounds.");
        return entries[index];
    }
}