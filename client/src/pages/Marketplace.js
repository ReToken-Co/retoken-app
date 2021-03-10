import React, { useContext } from "react";
//import { Web3Context } from "../context/Web3Context";
import { AssetContext } from "../context/AssetContext";
import { AssetCard } from "../components";

export default function Assets() {
  //  const { account, contract, web3 } = useContext(Web3Context)
  const account = ''
  const contract = {}
  const web3 = {}
  const { assets, dispatch } = useContext(AssetContext);

  // List Asset - Add asset to smart contract
  const listAsset = async (id) => {
    const asset = assets[id];

    if (asset.admin === account) {
      // asset can only be listed by platform admin

      if (!asset.transactionhash) {
        // if asset has not been registered in smart contract

        try {
          contract
            ? console.log(
                `SC ${id} ${contract.address} ${JSON.stringify(asset)}`
              )
            : console.log(`lost contract`);

          // Set start time for asset
          asset.starttime = Date.now();

          // Create an asset record in smart contract
          const result = await contract.createAsset(
            asset.id,
            asset.title,
            asset.image,
            (asset.starttime = asset.starttime.toString()),
            asset.duration,
            web3.utils.toWei(asset.startbid.toString(), "ether"),
            web3.utils.toWei(asset.reservebid.toString(), "ether"),
            { from: account }
          );
          console.log(`SC result  ${result.logs[0].transactionHash}`);

          // Update State & DB
          dispatch({
            type: "UPDATE_ASSET",
            payload: {
              id: id,
              transactionhash: result.logs[0].transactionHash,
              status: 1,
              bcid: Number(result.logs[0].args.bcid),
              starttime: asset.starttime.toString(),
              dstarttime: new Intl.DateTimeFormat(["ban", "sg"], {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }).format(asset.starttime.toString()),
            },
          });
          console.log(`assets {${JSON.stringify(assets)}}`);
        } catch (error) {
          console.log(error);
        }
      } else {
        alert(`Asset has been registered in smart contract`); // asset can only register once in smart contract
        console.log(
          `Asset has been registered in smart contract ${asset.transactionhash}`
        ); // asset can only register once in smart contract
      }
    } else {
      alert(
        `You are not authorized to list the asset as you not REToken admin`
      );
      console.log(`You are not authorized to list the asset as you not REToken. 
                 Owner: ${asset.seller} This wallet: ${account}`); // only admin can list asset
    }
  };

  return (
    <>
      <br />
      {assets.map((_asset) => (
        <div className="asset" key={_asset._id}>
          <AssetCard
            id={_asset._id}
            scId={_asset.scId}
            image={_asset.image}
            transactionHash={_asset.transactionHash}
            subscription={_asset.subscription}
            status={_asset.status}
            owner={_asset.owner}
            askingPrice={_asset.askingPrice}
            noOfToken={_asset.noOfToken}
            pricePerToken={_asset.pricePerToken}
            street={_asset.street}
            city={_asset.city}
            state={_asset.state}
            country={_asset.country}
            zipCode={_asset.zipCode}
            description={_asset.description}
            propertyType={_asset.propertyType}
            builtSize={_asset.builtSize}
            landSize={_asset.landSize}
            yearBuilt={_asset.yearBuilt}
            occupancy={_asset.occupancy}
            annualGrossRent={_asset.annualGrossRent}
            annualExpense={_asset.annualExpense}
            noi={_asset.noi}
            expectedYield={_asset.expectedYield}
            account={account}
            listAsset={listAsset}
          />
          <br />
        </div>
      ))}
    </>
  );
}
