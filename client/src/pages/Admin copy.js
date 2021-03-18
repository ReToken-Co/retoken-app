import React, { useContext, useState } from "react";
//import { Web3Context } from "../context/Web3Context";
import { AssetCard, Sidebar, Navbar } from "../components";
import { AssetContext } from "../context/AssetContext";

export default function Admin() {
  const { assets, assetDispatch } = useContext(AssetContext);
  const [propertyStatus, setPropertyStatus] = useState(0);
  //  const { account, contract, web3 } = useContext(Web3Context)
  const account = "";
  const contract = {};
  const web3 = {};

  //  console.log (`admin asset ${JSON.stringify(assets)}`)

  const updateStatusInput = (_statusInput) => {
    console.log(`menu status ${_statusInput}`);
    setPropertyStatus(_statusInput);
  };

  // Publish Asset - Add asset to smart contract
  const publishAsset = async (id) => {
    const asset = assets[id];

    try {
      contract
        ? console.log(`SC ${id} ${contract.address} ${JSON.stringify(asset)}`)
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
      console.log(`SC result  ${result.transactionHash}`);
      // ERC1155 Token ID
      console.log(result.events.RETokenID.returnValues[0]);

      const _subscription = asset.ownerSubscription / asset.noOfToken

      // Update properties State & DB
      assetDispatch({
        type: "UPDATE_ASSET",
        payload: {
          id: asset._id,
          transactionHash: result.transactionHash,
          status: 1,
          subscription = _subscription,
          tokenId: Number(result.events.RETokenID.returnValues[0]),
        },
      });

      // Update properties State & DB
      assetDispatch({
        type: "UPDATE_ASSET",
        payload: {
          id: asset._id,
          transactionHash: result.transactionHash,
          status: 1,
          tokenId: Number(result.events.RETokenID.returnValues[0]),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar admin={"true"} />
      <Sidebar updateStatusInput={updateStatusInput} />
      <br />
      {assets
        .filter((_assettemp) => _assettemp.status === propertyStatus)
        .map((_asset) => (
          <div className="asset" key={_asset._id}>
            <AssetCard
              publishAsset={publishAsset}
              id={_asset._id}
              tokenId={_asset.tokenId}
              image={_asset.image}
              transactionHash={_asset.transactionHash}
              invProspectHash={_asset.invProspectHash}
              valuationHash={_asset.valuationHash}
              subscription={_asset.subscription}
              status={_asset.status}
              owner={_asset.owner}
              askingPrice={_asset.askingPrice}
              noOfToken={_asset.noOfToken}
              pricePerToken={_asset.pricePerToken}
              ownerSubscription={_asset.ownerSubscription}
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
              admin={"true"}
            />
            <br />
          </div>
        ))}
    </>
  );
}
