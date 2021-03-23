// SPDX-License-Identifier: MIT

pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "./libraries/AccessControlUpgradeable.sol";
import "./libraries/PausableUpgradeable.sol";
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

contract LogicOne is AccessControlUpgradeable, PausableUpgradeable, RETokenStorageOne {
    
    /**
     * @dev Ver.1 Throws if called by any account without ADMIN_ROLE access.
     */
    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "Access Denied: Caller is not the Admin");
        _;
    }

    /**
     * @dev Series of functions to retrieve token details from `REToken` struct, including
     * Total Supply, Owner, Valuation Report, Legal Contract and Service Fee.
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

    function getFee(uint256 tokenId) public view returns (uint256) {
        REToken memory token = reToken[tokenId];
        return token.fee;
    }

    /**
     * @dev Creates `totalAmt` tokens of token type `newTokenId`, and assigns `adminAmt` to
     * `proxy_contract` and `ownerAmt` `assetOwner` by calling ERC1155 _mint function.
     *
     * Can only be called by the current admin.
     * 
     * Emits a {RETokenID} event.
     * Emits two {TransferSingle} events via ERC1155 library.
     *
     * Requirements:
     * - `legalContr` must not have been used for another token ID.
     *
     * @param assetOwner - Asset Owner wallet address
     * @param totalAmt - Total number of tokens for unique token ID
     * @param ownerAmt - Total number of tokens for Asset Owner
     * @param valueRpt - File Hash of Valuation Report
     * @param legalContr - File Hash of Legal Contract
     */
    function mintToken(address assetOwner, uint256 totalAmt, uint256 ownerAmt, string memory valueRpt, string memory legalContr, uint256 fee) external onlyAdmin whenNotPaused {
        require(_legalContracts[legalContr] == 0, "This asset has already been tokenized.");

        RETokenStorageOne.incrementTokenId();
        
        uint256 newTokenId = _tokenID;
        uint256 adminAmt = totalAmt - ownerAmt;

        emit RETokenID(block.timestamp, newTokenId, totalAmt, assetOwner, valueRpt, legalContr);

        // Creates and updates REToken Struct of unique token ID with token details
        REToken storage token = reToken[_tokenID];
        token.totalSupply = totalAmt;
        token.owner = assetOwner;
        token.valuationReport = valueRpt;
        token.legalContract = legalContr;
        token.fee = fee;

        _legalContracts[legalContr] = _tokenID;

        _mint(proxy_contract, newTokenId, adminAmt, "");
        _mint(assetOwner, newTokenId, ownerAmt, "");
    }
    
    /**
     * @dev Withdraws USDT from Proxy Contract
     *
     * Can only be called by the current admin.
     * 
     * Emits a {USDTWithdrawn} event.
     *
     * @param recipient - Wallet address to withdraw USDT to
     * @param amt - Amount of USDT to withdraw
     */
    function withdrawUSDT(address recipient, uint256 amt) external onlyAdmin {
        require(usdtContract.balanceOf(proxy_contract) >= amt, "Number of USDT withdrawn exceed balance.");
        
        emit USDTWithdrawn(block.timestamp, msg.sender, recipient, amt);
        
        usdtContract.transferUSDT(proxy_contract, recipient, amt);
    }

}