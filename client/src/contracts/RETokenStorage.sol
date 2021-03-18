// SPDX-License-Identifier: MIT

pragma solidity >= 0.7.4;

import "./libraries/ERC1155Upgradeable.sol";
import "./libraries/ERC1155HolderUpgradeable.sol";
import "./libraries/utils/CountersUpgradeable.sol";
import './USDT.sol';
import './RETokenProxy.sol';

/**
 * @title RETokenStorage
 * @dev This contract provides the storage structure for the RETokenProxy contract
 * using ERC1155 and Counters structure. It also allows this contract to hold ERC1155 tokens.
 *
 * VERSION: 1 (Ver.1)
 * 1. Add USDT and Proxy Contract variables and external connections
 * 2. Add Token ID variable
 * 3. Add Struct to store Token details
 * 4. Add functions necessary for ERC1155 tokens
 */
contract RETokenStorage is ERC1155Upgradeable, ERC1155HolderUpgradeable {

    /**
     * @dev Ver.1 Declaration of initial variables.
     * 1. `MODERATOR` - Group of addresses possessing moderator authorization for AccessControl contract
     * 2. `ADMIN_ROLE` - Group of addresses possessing admin authorization
     * 3. `usdt_contract` - USDT Contract address
     * 4. `usdtContract` - External connection to USDT Contract
     * 5. `proxy_contract` - Proxy Contract address
     * 6. `proxyContract` - External connection to Proxy Contract
     */
    bytes32 public constant MODERATOR = keccak256("MODERATOR");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    address public usdt_contract;
    USDT usdtContract;
    address payable public proxy_contract;
    RETokenProxy proxyContract;

    /**
     * @dev Declaring `_tokenID` variable as unique Token ID using Counters library
     */
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter internal _tokenIds;
    uint256 public _tokenID = _tokenIds.current();

    /**
     * @dev Declaring `REToken` struct to store token details and
     * mapping of Token ID to REToken Struct
     */
    struct REToken {
        uint256 totalSupply;
        address owner;
        string valuationReport;
        string legalContract;
    }
    mapping (uint256 => REToken) reToken;

     /**
     * @dev Declaration of new Event to record created token details for REToken
     *
     * @param timestamp - Time Stamp of Event
     * @param id - Unique token ID
     * @param totalSupply - Number of tokens for unique token ID
     * @param owner - Asset Owner wallet address
     * @param valuationReport - File Hash of Valuation Report
     * @param legalContract - File Hash of Legal Contract
     */
    event RETokenID(uint256 timestamp, uint256 indexed id, uint256 indexed totalSupply, address indexed owner, string valuationReport, string legalContract);

    /**
     * @dev Functions for ERC1155 Token
     * 1. __ERC1155_init - Construct the ERC1155 token with URI
     * 2. incrementTokenId() - Increase `tokenID` by 1 before minting new token
     */
    function __ERC1155_init() initializer internal {
        __ERC1155_init("https://token-cdn-domain/{id}.json");
    }

    function incrementTokenId() internal {
        _tokenIds.increment();
        _tokenID = _tokenIds.current();
    }

}