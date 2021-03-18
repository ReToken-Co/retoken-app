// SPDX-License-Identifier: MIT

pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "./libraries/AccessControlUpgradeable.sol";
import './RETokenStorageOne.sol';

/**
 * @title RETokenBusinessLogic
 * @dev This contract provides the business logic for RETokenProxy with an authorization
 * mechanism for admin tasks.
 * 
 * VERSION: 1 (Ver.1)
 * 1. Add 4 functions to retrieve created token details.
 * 2. Add mintToken() function for Admin to create new token.
 */ 

contract LogicOne is AccessControlUpgradeable, RETokenStorageOne {
    
    /**
     * @dev Ver.1 Throws if called by any account without ADMIN_ROLE access.
     */
    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "Access Denied: Caller is not the Admin");
        _;
    }

    /**
     * @dev Series of functions to retrieve token details from `REToken` struct, including
     * Total Supply, Owner, Valuation Report and Legal Contract.
     *
     * @param tokenId - Unique token id of token
     */
    function getTotalSupply(uint256 tokenId) external view returns (uint256) {
        REToken memory token = reToken[tokenId];
        return token.totalSupply;
    }

    function getOwner(uint256 tokenId) external view returns (address) {
        REToken memory token = reToken[tokenId];
        return token.owner;
    }

    function getValuationRpt(uint256 tokenId) external view returns (string memory) {
        REToken memory token = reToken[tokenId];
        return token.valuationReport;
    }

    function getLegalContr(uint256 tokenId) external view returns (string memory) {
        REToken memory token = reToken[tokenId];
        return token.legalContract;
    }

    /**
     * @dev Creates `totalAmt` tokens of token type `newTokenId`, and assigns `adminAmt` to
     * `proxy_contract` and `ownerAmt` `assetOwner` by calling ERC1155 _mint function.
     *
     * Can only be called by addresses with ADMIN_ROLE access.
     * 
     * Emits a {RETokenID} event.
     * Emits two {TransferSingle} events via ERC1155 library.
     *
     * @param assetOwner - Asset Owner wallet address
     * @param totalAmt - Total number of tokens for unique token ID
     * @param ownerAmt - Total number of tokens for Asset Owner
     * @param valueRpt - File Hash of Valuation Report
     * @param legalContr - File Hash of Legal Contract
     */
    function mintToken(address assetOwner, uint256 totalAmt, uint256 ownerAmt, string memory valueRpt, string memory legalContr) external onlyAdmin {
        RETokenStorageOne.incrementTokenId();
        
        uint256 newTokenId = _tokenID;
        uint256 adminAmt = totalAmt - ownerAmt;

        emit RETokenID(newTokenId, totalAmt, assetOwner, valueRpt, legalContr);

        // Creates and updates REToken Struct of unique token ID with token details
        REToken storage token = reToken[_tokenID];
        token.totalSupply = totalAmt;
        token.owner = assetOwner;
        token.valuationReport = valueRpt;
        token.legalContract = legalContr;

        _mint(proxy_contract, newTokenId, adminAmt, "");
        _mint(assetOwner, newTokenId, ownerAmt, "");
    }

}