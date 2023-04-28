// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Account {
    uint256 public balance;
    string public accountName;
    address public owner;

    constructor(string memory _accountName) {
        owner = msg.sender;
        accountName = _accountName;
    }

    function debit(uint256 _amount) public {
        require(msg.sender == owner, "Only the owner can perform this action.");
        balance += _amount;
    }

    function credit(uint256 _amount) public {
        require(msg.sender == owner, "Only the owner can perform this action.");
        require(balance >= _amount, "Insufficient balance.");
        balance -= _amount;
    }
}
