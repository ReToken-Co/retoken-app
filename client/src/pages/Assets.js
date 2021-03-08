import React, { useContext } from 'react'
import { Web3Context } from '../context/Web3Context';
import { AssetContext } from '../context/AssetContext';
import { AssetCard } from '../components'

export default function Auctions() {

//    const { account, contract, web3 } = useContext(Web3Context)
    const { assets, dispatch } = useContext(AssetContext)

//    console.log(`Assets  ${account} ${JSON.stringify(assets[0])}`)

    // Start Auction - Add auction to smart contract
    const listAsset = async (id) => {
        const asset = assets[id]

        if (asset.admin === account) {  // asset can only be listed by platform admin

            if (!asset.transactionhash) {   // if asset has not been registered in smart contract

                try {
                    contract ? console.log(`SC ${id} ${contract.address} ${JSON.stringify(auction)}`) : console.log(`lost contract`)

                    // Set start time for auction
                    auction.starttime = Date.now()

                    // Create an auction record in smart contract
                    const result = await contract.createAuction(
                        auction.id,
                        auction.title,
                        auction.image,
                        auction.starttime = auction.starttime.toString(),
                        auction.duration,
                        web3.utils.toWei(auction.startbid.toString(), 'ether'),
                        web3.utils.toWei(auction.reservebid.toString(), 'ether'),
                        { from: account })
                    console.log(`SC result  ${result.logs[0].transactionHash}`)

                    // Update State & DB
                    auctionDispatch({
                        type: 'UPDATE_AUCTION',
                        payload: {
                            id: id,
                            transactionhash: result.logs[0].transactionHash,
                            status: 1,
                            bcid: Number(result.logs[0].args.bcid),
                            starttime: auction.starttime.toString(),
                            dstarttime: new Intl.DateTimeFormat(['ban', 'sg'],
                                {
                                    year: 'numeric', month: '2-digit', day: '2-digit',
                                    hour: '2-digit', minute: '2-digit', second: '2-digit'
                                }).format(auction.starttime.toString())
                        }
                    })
                    console.log(`auctions {${JSON.stringify(auctions)}}`)

                } catch (error) {
                    console.log(error)
                }
            } else {
                alert(`Auction has been registered in smart contract`)  // auction can only register once in smart contract
                console.log(`Auction has been registered in smart contract ${auction.transactionhash}`)  // auction can only register once in smart contract
            }
        } else {
            alert(`You are not authorized to start the auction as you not the owner`)
            console.log(`You are not authorized to start the auction as you not the owner. 
                 Owner: ${auction.seller} This wallet: ${account}`)  // only seller can start auction
        }
    }

    return (
        <>
            <br />
            {auctions.map(_auction => (
                <div className="auction" key={_auction.id}>
                    <AuctionCard
                        id={_auction.id}
                        bcid={_auction.bcid}
                        image={_auction.image}
                        title={_auction.title}
                        seller={_auction.seller}
                        startbid={_auction.startbid}
                        currentbid={_auction.currentbid}
                        starttime={_auction.starttime}
                        dstarttime={_auction.dstarttime}
                        duration={_auction.duration}
                        status={_auction.status}
                        numbid={_auction.numbid}
                        transactionhash={_auction.transactionhash}
                        account={account}
                        startAuction={startAuction} />
                    <br />
                </div>
            ))}
        </>
    )

}