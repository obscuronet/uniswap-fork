// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PedroToken is ERC20 {
    constructor(uint initialAmount) ERC20("Pedro Token", "PTK") {
        _mint(msg.sender, initialAmount);
    }
}