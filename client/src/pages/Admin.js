import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router";
import { AssetCard, Sidebar, Navbar } from "../components";
import { AssetContext } from "../context/AssetContext";
import { UserContext } from "../context/UserContext";
import { TransactionContext } from "../context/TransactionContext";
import { ContractContext } from "../context/ContractContext";

export default function Admin() {
  const location = useLocation();
  const { assets, assetDispatch } = useContext(AssetContext);
  const { transactionDispatch } = useContext(TransactionContext);
  const { logicOneContract, initLogicOne } = useContext(ContractContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [assetType, setAssetType] = useState(0);

  useEffect(() => {
  }, [assets]);

  useEffect(() => {
    if (!assets || assets.length === 0) {
      const getAssets = async () => {
        await assetDispatch({ type: "GET_ASSETS" });
      };
      getAssets().then(() => {
        setLoading(false);
        console.log(`setpage = false ${assets}`);
      });
    } else setLoading(false);
    console.log(`loading ${loading} ${assets.length} ${assetType}`);
  }, [user]);

  useEffect(() => {
    // Set LogicOneContract state
    const getLogicOneContract = async () => {
      await initLogicOne();
    };
    if (logicOneContract === undefined || !logicOneContract)
      getLogicOneContract();
  }, []);

  useEffect(() => {
    if (location !== undefined && location.state !== undefined) {
      setAssetType(location.state.assetStatus);
    } else {
      setAssetType(0);
    }
  }, [location]);

  // Publish Asset - Add asset to smart contract
  const publishAsset = async (e) => {
    e.preventDefault();

    const id = e.target.id;
    const asset = assets.find((_asset) => _asset._id === id);

    console.log(`publish asset assetID=${id}, account=${user.address}, 
      owner=${asset.owner}, # Token=${asset.noOfToken}, 
      owner sub=${asset.ownerSubscription}, valhash=${asset.valuationHash}, 
      IPhash=${asset.invProspectHash}, 
      contract=${logicOneContract}`);

    if (!logicOneContract) {
      console.log(`Lost contract, run initLogicOne`);
      await initLogicOne();
      console.log(`logi ${JSON.stringify(logicOneContract)}`);
    }

    if (asset && logicOneContract && user) {
      const result = await logicOneContract.methods
        .mintToken(
          asset.owner,
          asset.noOfToken,
          asset.ownerSubscription,
          asset.valuationHash,
          asset.invProspectHash
        )
        .send({ from: user.address });
      console.log(
        `mintToken result ${result.transactionHash} ${result.events.RETokenID.returnValues.id}
        ${result.events.RETokenID.returnValues.timestamp} `
      );

      setLoading(true); // stop page from rendering, if not get error
      // Add transaction State & DB
      await transactionDispatch({
        type: "ADD_TRANSACTION",
        payload: {
          investor: asset.owner,
          propertyId: asset._id,
          noOfToken: asset.ownerSubscription,
          transactionHash: result.transactionHash,
          transactionDate:
             result.events.RETokenID.returnValues.timestamp * 1000,
        },
      });
//      setLoading(true); // stop page from rendering, if not get error

      // Update properties State & DB
      const _subscription = asset.noOfToken > 0 ? 
      ((asset.ownerSubscription / asset.noOfToken * 100).toFixed(1)) : 0 
      console.log(`sub ${_subscription} ${asset._id}`)
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
      await assetDispatch({ type: "GET_ASSETS" });

      // set back to false to refresh page
      setLoading(false); // trigger UseEffect for pageloading
    } else {
      console.log(`missing data`);

      // console.log(`missing data for smart contract:\ne assetID=${id}, account=${user.address}, 
      // owner=${asset.owner}, # of Token=${asset.noOfToken}, 
      // owner sub=${asset.ownerSubscription}, valhash=${asset.valuationHash}, 
      // IPhash=${asset.invProspectHash}, 
      // contract=${logicOneContract}`);
    }
  };

  return (
    <>
      <Navbar admin={"true"} />
      <Sidebar />
      <br />
      {loading ? (
        <div>
          <p style={{ marginLeft: "500px", marginTop: "200px" }}>
            Page Loading.....
          </p>
        </div>
      ) : (
        assets
          .filter((_assettemp) => _assettemp.status === assetType)
          .map((_asset, index) => (
            <div className="asset" key={index}>
              <AssetCard
                publishAsset={publishAsset}
                index={index}
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
          ))
      )}
    </>
  );
}
