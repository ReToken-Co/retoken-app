// SPDX-License-Identifier: MIT

pragma solidity >= 0.7.4;

import "./libraries/utils/Initializable.sol";
import "./libraries/ERC20Upgradeable.sol";

contract USDT is ERC20Upgradeable {
    
    // contruct the token with name, symbol and set as default 18 decimals
    function __USDT_init()  public initializer {
        __ERC20_init("Mock USDT", "USDT");
    }

    function mintUSDT(address to, uint256 amt) public {
        uint256 newAmt = amt * 10 ** 18;
        _mint(to, newAmt);
    }

    function transferUSDT(address from, address to, uint256 amt) public {
        uint256 newAmt = amt * 10 ** 18;
        _transfer(from, to, newAmt);
    }
    
}