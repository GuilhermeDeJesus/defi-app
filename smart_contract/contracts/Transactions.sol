// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Transactions {
    event Transfer(
        address sender,
        address receiver,
        uint amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    // msg.sender - Daquele que está fazendo envia o valor, é como se fosse o cliente no web2
    function publishTransaction(
        address payable receiver,
        uint amount,
        string memory message,
        string memory keyword
    ) public {
        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }
}
