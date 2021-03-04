//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.5;
pragma experimental ABIEncoderV2;

contract ReTokenApp {
    // data structure in BC
    struct Bid {
        uint256 id;
        uint256 bidAmount;
        address payable bidder;
        uint256 timestamp;
        bool refunded;
        string refundTxHash;
        string txHash;
    }
    struct ReToken {
        uint256 id; // id of auction record in db
        string title; // auction title
        address payable seller;
        string imgFile; // item image file
        Bid[] bids;
        uint256 timestamp;
        uint256 duration;
        uint256 startPrice; // In wei
        uint256 reservePrice;
        uint256 currentBid;
        uint256 numBid;
        int8 status;
    }
    ReToken[] public tokens; // token array - all tokens
    string public contractName;
    address admin;

    event ReTokenCreated(
        uint256 bcid,
        uint256 id,
        string title,
        address seller,
        string imgFile,
        uint256 timstamp,
        uint256 duration,
        uint256 startPrice,
        uint256 reservePrice
    );
    event BidPlaced(
        uint256 auctionId,
        uint256 bidId,
        address payable bidder,
        uint256 bidAmount,
        uint256 timstamp
    );
    event BidRefunded(
        uint256 auctionId,
        uint256 bidId,
        address payable bidder,
        uint256 refundAmount,
        uint256 timstamp
    );
    event PaySeller(
        uint256 auctionId,
        address payable seller,
        int8 status,
        address winner,
        uint256 releaseAmount
    );

    constructor() {
        contractName = "My Auction App";
        admin = msg.sender;
    }

    // Create an Token
    function createToken(
        uint256 _id,
        string memory _title,
        string memory _imgFile,
        uint256 _timestamp,
        uint256 _duration,
        uint256 _startPrice,
        uint256 _reservePrice
    ) public returns (uint256) {
        auctions.push();
        uint256 _bcAuctionId = auctions.length - 1;
        auctions[_bcAuctionId].id = _id; // id in DB
        auctions[_bcAuctionId].title = _title;
        auctions[_bcAuctionId].seller = msg.sender;
        auctions[_bcAuctionId].imgFile = _imgFile;
        auctions[_bcAuctionId].timestamp = _timestamp;
        auctions[_bcAuctionId].duration = _duration;
        auctions[_bcAuctionId].startPrice = _startPrice;
        auctions[_bcAuctionId].reservePrice = _reservePrice;
        auctions[_bcAuctionId].currentBid = _startPrice;
        emit AuctionCreated(
            _bcAuctionId,
            _id,
            _title,
            msg.sender,
            _imgFile,
            _timestamp,
            _duration,
            _startPrice,
            _reservePrice
        );
        return _bcAuctionId;
    }

    modifier notSeller(uint256 _id) {
        require(msg.sender != auctions[_id].seller, "Seller not allow to bid");
        _;
    }

    // Place a bid with modifier
    function placeBid(uint256 _bcAuctionId, uint256 _timestamp)
        public
        payable
        notSeller(_bcAuctionId)
        returns (bool)
    {
        auctions[_bcAuctionId].bids.push();
        uint256 _bidId = auctions[_bcAuctionId].bids.length - 1;
        auctions[_bcAuctionId].bids[_bidId].id = _bidId;
        auctions[_bcAuctionId].bids[_bidId].bidder = msg.sender;
        auctions[_bcAuctionId].bids[_bidId].bidAmount = msg.value;
        auctions[_bcAuctionId].bids[_bidId].timestamp = _timestamp;
        auctions[_bcAuctionId].bids[_bidId].refunded = false;
        auctions[_bcAuctionId].currentBid = msg.value;
        auctions[_bcAuctionId].numBid = _bidId + 1;
        emit BidPlaced(_bcAuctionId, _bidId, msg.sender, msg.value, _timestamp);

        // Call RefundBid function to refund the previous bidder
        if (_bidId > 0) refundBid(_bcAuctionId, _bidId, _timestamp);
        return true;
    }

    // Refund bid to the previous bidder
    function refundBid(
        uint256 _bcAuctionId,
        uint256 _bidId,
        uint256 _timestamp
    ) internal {
        auctions[_bcAuctionId].bids[_bidId - 1].bidder.transfer(
            auctions[_bcAuctionId].bids[_bidId - 1].bidAmount
        );
        auctions[_bcAuctionId].bids[_bidId - 1].refunded = true;
        emit BidRefunded(
            _bcAuctionId,
            _bidId - 1,
            auctions[_bcAuctionId].bids[_bidId - 1].bidder,
            auctions[_bcAuctionId].bids[_bidId - 1].bidAmount,
            _timestamp
        );
    }

    modifier isWinner(address winner) {
        require(msg.sender == winner, "Only winner can release fund");
        _;
    }

    // Pay seller of the auction
    function paySeller(
        uint256 _bcAuctionId,
        address _winner,
        uint256 _winningAmount
    ) public payable isWinner(_winner) returns (bool) {
        auctions[_bcAuctionId].seller.transfer(_winningAmount);
        auctions[_bcAuctionId].status = -1;
        emit PaySeller(
            _bcAuctionId,
            auctions[_bcAuctionId].seller,
            auctions[_bcAuctionId].status,
            _winner,
            _winningAmount
        );
        return true;
    }

    // GET all bids of an auction
    function getBids(uint256 _bcAuctionId) public view returns (Bid[] memory) {
        return (auctions[_bcAuctionId].bids);
    }

    function contractBalance() external view returns(uint) {
        return address(this).balance;
    }

    // fallback to receive fund
    fallback() external payable {
        // Receiving ether
    }

    receive() external payable {
        // React to receiving ether
    }
}
