import React, { useContext, useState, useEffect } from "react";
import { AssetCard, Sidebar, Navbar } from "../components";
import { AssetContext } from "../context/AssetContext";
import { TransactionContext } from "../context/TransactionContext";
import { ContractContext } from "../context/ContractContext";

export default function Admin() {
  const { assets, assetDispatch } = useContext(AssetContext);
  const { transactionDispatch } = useContext(TransactionContext);
  const [propertyStatus, setPropertyStatus] = useState(0);
  const { account, initAccount, logicOneContract, initLogicOne } = useContext(
    ContractContext
  );

  //  console.log (`admin asset ${JSON.stringify(assets)}`)
  useEffect(() => {
    // Get instance of asset
    const getAssets = async () => {
      await assetDispatch({ type: "GET_ASSETS" });
    };
    if (assets === undefined || !assets)
      getAssets().then(() => {
        console.log(`UE logi1 ${assets}`);
      });
  }, [assets]);

  useEffect(() => {
    // Get instance of contract
    const getLogicOneContract = async () => {
      await initLogicOne();
    };
    if (logicOneContract === undefined || !logicOneContract)
      getLogicOneContract().then(() => {
        console.log(`UE logi1 ${logicOneContract}`);
      });
  }, [logicOneContract]);

  useEffect(() => {
    // Get web3 account address
    const getAccount = async () => {
      await initAccount();
    };
    if (account === undefined || !account)
      getAccount().then(() => {
        console.log(`UE acct ${account}`);
      });
  }, [account]);

  const updateStatusInput = (_statusInput) => {
    setPropertyStatus(_statusInput);
  };

  // Publish Asset - Add asset to smart contract
  const publishAsset = async (id) => {
    const asset = assets.find((_asset) => _asset._id === id);
    console.log(`publish asset\ne assetID=${id}, account=${account}, 
      owner=${asset.owner}, # of Token=${asset.noOfToken}, 
      owner sub=${asset.ownerSubscription}, valhash=${asset.valuationHash}, 
      IPhash=${asset.invProspectHash}, 
      contract=${logicOneContract}`);

    if (!logicOneContract) {
      console.log(`Lost contract, run initLogicOne`);
      await initLogicOne();
      console.log(`logi ${JSON.stringify(logicOneContract)}`);
    }

    if (asset && logicOneContract && account) {
    
      const result = await logicOneContract.methods
        .mintToken(
          asset.owner,
          asset.noOfToken,
          asset.ownerSubscription,
          asset.valuationHash,
          asset.invProspectHash
        )
        .send({ from: account });
      console.log(
        `mintToken result ${result.transactionHash} ${result.events.RETokenID.returnValues.id}
        ${result.events.RETokenID.returnValues.timestamp} `
      );

      // Add transaction State & DB
      await transactionDispatch({
        type: "ADD_TRANSACTION",
        payload: {
          investor: asset.owner,
          propertyId: asset._id,
          noOfToken: asset.ownerSubscription,
          transactionHash: result.transactionHash,
          transactionDate: result.events.RETokenID.returnValues.timestamp * 1000,
        },
      });

      // Update properties State & DB
      const _subscription = (asset.ownerSubscription / asset.noOfToken).toFixed(2);
      await assetDispatch({
        type: "UPDATE_ASSET",
        payload: {
          id: asset._id,
          transactionHash: result.transactionHash,
          status: 1,
          subscription: _subscription,
          tokenId: Number(result.events.RETokenID.returnValues.id),
        },
      });
//      console.log(`updated asset ${asset.owner} ${asset._id} ${asset.ownerSubscription}
//        ${result.transactionHash} `)

    } else {
      console.log(`missing data for smart contract:\ne assetID=${id}, account=${account}, 
      owner=${asset.owner}, # of Token=${asset.noOfToken}, 
      owner sub=${asset.ownerSubscription}, valhash=${asset.valuationHash}, 
      IPhash=${asset.invProspectHash}, 
      contract=${logicOneContract}`);
    }
  };

  return (
    <>
      <Navbar admin={"true"} />
      <Sidebar updateStatusInput={updateStatusInput} />
      <br />
      {assets !== undefined || assets.length > 0 ? (
        assets
          .filter((_assettemp) => _assettemp.status === propertyStatus)
          .map((_asset, index) => (
            <div className="asset" key={index}>
              <AssetCard
                publishAsset={publishAsset}
                index={index}
                id={_asset._id}
                scId={_asset.scId}
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
          ))
      ) : (
        <>Loading.....</>
      )}
    </>
  );
}
