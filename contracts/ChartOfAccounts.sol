// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChartOfAccounts {
    struct Account {
        string name;
        string accountType;
        uint256 balance;
        string description;
    }

    Account[] public accounts;

    function addAccount(
        string memory _name,
        string memory _accountType,
        uint256 _balance,
        string memory _description
    ) public {
        accounts.push(Account(_name, _accountType, _balance, _description));
    }

    function getAllAccounts() public view returns (Account[] memory) {
        return accounts;
    }

    function getAccountByIndex( uint256 index) public view returns (string memory, string memory, uint256) {
        require(index < accounts.length, "Account does not exist");
        Account memory account = accounts[index];
        return (account.name, account.accountType, account.balance);
    }

    function getAccountByName(string memory name) public view returns (string memory, string memory, uint256) {
    for (uint256 i = 0; i < accounts.length; i++) {
        if (keccak256(bytes(accounts[i].name)) == keccak256(bytes(name))) {
            return (accounts[i].name, accounts[i].accountType, accounts[i].balance);
        }
    }
    revert("Account not found");
    }
}
