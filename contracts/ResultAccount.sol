// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ResultAccount {
    uint256 public balance;
    string public accountName;
    address public owner;
    bool public isExpense; // Variable para indicar si la cuenta es de gastos o ingresos

    constructor(string memory _accountName, bool _isExpense) {
        owner = msg.sender;
        accountName = _accountName;
        isExpense = _isExpense;
    }

    function debit(uint256 _amount) public {
        require(msg.sender == owner, "Only the owner can perform this action.");
        if (isExpense) {
            balance += _amount;
        } else {
            require(balance >= _amount, "Insufficient balance.");
            balance -= _amount;
        }
    }

    function credit(uint256 _amount) public {
        require(msg.sender == owner, "Only the owner can perform this action.");
        if (isExpense) {
            require(balance >= _amount, "Insufficient balance.");
            balance -= _amount;
        } else {
            balance += _amount;
        }
    }

    function resetBalance() public {
        require(msg.sender == owner, "Only the owner can perform this action.");
        balance = 0;
    }
}
