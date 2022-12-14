// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDC is ERC20 {
    constructor(uint initialAmount) ERC20("USDC", "USDC") {
        _mint(msg.sender, initialAmount);
    }
}