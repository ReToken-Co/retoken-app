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
 * VERSION: 2 (Ver.2)
 * 1. Add Event to record any REToken/USDT pair transaction done in REToken
 */
contract RETokenStorageOne is ERC1155Upgradeable, ERC1155HolderUpgradeable {
    
    /**
     * @dev Ver.1 Declaration of initial variables.
     * 1. `MODERATOR` - Group of addresses possessing moderator authorization for AccessControl contract
     * 2. `ADMIN_ROLE` - Group of addresses possessing admin authorization
     * 3. `usdt_contract` - USDT Contract address
     * 4. `usdtContract` - Contract Instance of to USDT Contract
     * 5. `proxy_contract` - Proxy Contract address
     * 6. `proxyContract` - Contract Instance of to Proxy Contract
     * 7. `_legalContracts` - Mapping of Token ID to Legal Contract File Hash
     */
    bytes32 public constant MODERATOR = keccak256("MODERATOR");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    address public usdt_contract;
    USDT usdtContract;
    address payable public proxy_contract;
    RETokenProxy proxyContract;
    mapping (string => uint256) _legalContracts;

    /**
     * @dev Declaration of `_tokenID` variable as unique Token ID using Counters library
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
        uint256 fee;
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
     * @dev Declaration of new Event to record created token details for REToken
     *
     * @param timestamp - Time Stamp of Event
     * @param initiator - Wallet Address that invoked the withdrawal process
     * @param recipient - Wallet address which received the USDT
     * @param USDT - Total amount of USDT withdrawn
     */
    event USDTWithdrawn(uint256 timestamp, address initiator, address recipient, uint256 USDT);

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

    /**
     * @dev Ver.2 Declaration of new Event to record all USDT transactions for REToken
     *
     * @param timestamp - Time Stamp of Event
     * @param id - Unique token ID purchased
     * @param tokenAmt - Number of tokens for unique token ID purchased
     * @param buyer - Buyer wallet address
     * @param seller - Seller wallet address
     * @param USDT - Total amount of USDT paid by buyer
     */
    event RETokenUSDT(uint256 timestamp, uint256 indexed id, uint256 tokenAmt, address indexed buyer, address indexed seller, uint256 USDT);
}