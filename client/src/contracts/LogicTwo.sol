// SPDX-License-Identifier: MIT

pragma solidity ^0.7.4;

import "./libraries/AccessControlUpgradeable.sol";
import "./libraries/PausableUpgradeable.sol";
import './RETokenStorageOne.sol';

/**
 * @title RETokenBusinessLogic
 * @dev This contract provides the business logic for RETokenProxy with an authorization
 * mechanism for admin tasks.
 * 
 * VERSION: 2 (Ver.2)
 * 1. Add buyToken() function for Investor to purchase tokens from Owner.
 */ 

contract LogicTwo is AccessControlUpgradeable, PausableUpgradeable, RETokenStorageOne {

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

    /**
     * @dev Ver.2 Transfers `tokenAmt` tokens of token type `id` from `proxy-contract` to `investor`
     * by calling ERC1155 safeTransferFrom function.
     * Approves `investor` to transfer tokens of `proxy-contract` and removes the approval
     * after transferring by calling ERC1155 setApprovalForAll function.
     * Requires usage of external call `proxyContract` to ensure msg.sender is Proxy Contract address.
     * 
     * Emits a {RETokenUSDT} event.
     * Emits a {TransferSingle} event and two {ApprovalForAll} events via ERC1155 library.
     * 
     * Requirements:
     * - `id` must be equal or less than current Token ID.
     * - `tokenAmt` must be equal or less than balance of Proxy Contract
     *
     * Transfers `usdtAmt` tokens from `investor` to `owner` via USDT Contract transferUSDT function by
     * calling ERC20 _transfer function.
     * Requires usage of external call `usdtContract` to communicate with USDT Contract.
     * 
     * Emits a {Transfer} event in USDT Contract via ERC20 library.
     *
     * Requirements:
     * - `usdtAmt` must be equal or more than balance of investor.
     *
     * @param id - Token ID
     * @param tokenAmt - Number of tokens purchased
     * @param usdtAmt - Price of tokens purchased in USDT
     */
    function buyToken(uint256 id, uint256 tokenAmt, uint256 usdtAmt) external whenNotPaused {
        require(_tokenID >= id, "Token ID doesn't exist.");
        require(balanceOf(proxy_contract, id) >= tokenAmt, "Number of tokens purchased exceed tokens available.");

        REToken memory token = reToken[id];
        
        address investor = msg.sender;
        address owner = token.owner;
        uint256 fee = token.fee;
        uint256 serviceFee = (usdtAmt * fee) / 100;
        uint256 ownerProceeds = usdtAmt - serviceFee;
        
        require(usdtContract.balanceOf(investor) >= usdtAmt, "You have insufficient funds to purchase tokens.");

        emit RETokenUSDT(block.timestamp, id, tokenAmt, investor, owner, ownerProceeds);

        usdtContract.transferUSDT(investor, owner, ownerProceeds);
        usdtContract.transferUSDT(investor, proxy_contract, serviceFee);

        proxyContract.setApprovalForAll(investor, true);
        safeTransferFrom(proxy_contract, investor, id, tokenAmt, "");
        proxyContract.setApprovalForAll(investor, false);
    }
    
}