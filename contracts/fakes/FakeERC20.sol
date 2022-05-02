pragma solidity ^0.8.4;
// SPDX-License-Identifier: AGPL-3.0-or-later

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * A Fake ERC20 contract for testing. Can create as many named toknens as we need to represent
 * on chain Tokens like DAI/Frax etc.
 *
 * Open mint to aid testing.
 */
contract FakeERC20 is ERC20 {
    constructor (string memory name_, string memory symbol_) ERC20(name_, symbol_) {}

    function mint(address to, uint256 amount) external {
      _mint(to, amount);
    }
}