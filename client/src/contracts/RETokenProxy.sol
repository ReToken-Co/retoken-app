// SPDX-License-Identifier: MIT

pragma solidity ^0.7.4;

import "./libraries/BaseUpgradeabilityProxy.sol";
import "./libraries/AccessControlUpgradeable.sol";
import './RETokenStorage.sol';

/**
 * @title RETokenProxy
 * @dev This contract builds on the BaseUpgradeabilityProxy contract with an authorization
 * mechanism for admin tasks and customized features.
 */
contract RETokenProxy is BaseUpgradeabilityProxy, AccessControlUpgradeable, RETokenStorage {
    
    /**
     * @dev Set `_c` as `usdt_contract` and set external call instance `usdtContract`.
     *
     * Can only be called by addresses with ADMIN_ROLE access.
     *
     * @param _c - USDT Contract address
     */  
    function setUSDTContract(address _c) external onlyAdmin {
        usdt_contract = _c;
        usdtContract = USDT(usdt_contract);
    }

    /**
     * @dev Set `_c` to `IMPLEMENTATION_SLOT` by calling BaseUpgradeabilityProxy _upgradeTo function.
     *
     * Can only be called by addresses with ADMIN_ROLE access.
     *
     * @param _c - USDT Contract address
     */  
    function upgradeTo(address _c) external onlyAdmin {
        _upgradeTo(_c);
    }

    /**
     * @dev Set current contract address as `proxy_contract`, external call instance `proxyContract`.
     * 
     * Set MODERATOR as admin of ADMIN_ROLE access by calling AccessControlUpgradeable _setRoleAdmin function.
     * Give deployer access for MODERATOR and ADMIN_ROLE by calling AccessControlUpgradeable _setRole function.
     * 
     * Construct ERC1155 token with URI by calling ERC1155 __ERC1155_init function.
     */    
    function __Proxy_init() public initializer {
        proxy_contract = address(this);
        proxyContract = RETokenProxy(proxy_contract);
        __AccessControl_init();
        _setRoleAdmin(ADMIN_ROLE, MODERATOR);
        _setupRole(MODERATOR, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
        __ERC1155_init();
    }
    
    /**
     * @dev Throws if called by any account without ADMIN_ROLE access.
     */
    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "Access Denied: Caller is not the Admin");
        _;
    }

}