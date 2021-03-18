import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { InputForm, Sidebar, Navbar } from "../components";
import { AssetContext } from "../context/AssetContext";

export default function EditAsset() {
  const { assets, assetDispatch } = useContext(AssetContext);
  const [asset, setAsset] = useState([]); // array stores all bids of the asset
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    let selectedAsset = {};

    if (location !== undefined) {
      // setAsset from location data
      selectedAsset = {
        id: location.state.id,
        tokenId: location.state.tokenId,
        image: location.state.image,
        transactionHash: location.state.transactionHash,
        invProspectHash: location.state.invProspectHash,
        valuationHash: location.state.valuationHash,
        subscription: location.state.subscription,
        status: location.state.status,
        owner: location.state.owner,
        askingPrice: location.state.askingPrice,
        noOfToken: location.state.noOfToken,
        pricePerToken: location.state.pricePerToken,
        ownerSubscription: location.state.ownerSubscription,
        street: location.state.street,
        city: location.state.city,
        state: location.state.state,
        country: location.state.country,
        zipCode: location.state.zipCode,
        description: location.state.description,
        propertyType: location.state.propertyType,
        builtSize: location.state.builtSize,
        landSize: location.state.landSize,
        yearBuilt: location.state.yearBuilt,
        occupancy: location.state.occupancy,
        annualGrossRent: location.state.annualGrossRent,
        annualExpense: location.state.annualExpense,
        noi: location.state.noi,
        expectedYield: location.state.expectedYield,
        account: location.state.account,
      };
      localStorage.setItem("AssetId", location.state.id);
    } else {
      // dispatch to get the asset record from DB
      const _id = localStorage.getItem("AssetId");
      selectedAsset = assetDispatch({
        type: "GET_ASSET",
        payload: _id,
      });
    }
    // set asset State
    setAsset(selectedAsset);
  }, [location]);

  const updateAsset = async (data) => {
//    console.log(`editasset ${JSON.stringify(data)}`);
    await assetDispatch({
      type: "UPDATE_ASSET",
      payload: {
        id: asset.id,
        image: data.image,
        owner: data.owner,
        askingPrice: data.askingPrice,
        noOfToken: data.noOfToken,
        pricePerToken: data.pricePerToken,
        ownerSubscription: data.ownerSubscription,
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
        description: data.description,
        propertyType: data.propertyType,
        builtSize: data.builtSize,
        landSize: data.landSize,
        yearBuilt: data.yearBuilt,
        occupancy: data.occupancy,
        annualGrossRent: data.annualGrossRent,
        annualExpense: data.annualExpense,
        noi: data.noi,
        expectedYield: data.expectedYield,
        invProspectHash: data.invProspectHash,
        valuationHash: data.valuationHash,
      },
    });
    await assetDispatch({ type: "GET_ASSETS" });
    history.push("/admin");
  };

  return (
    <>
      <Navbar admin={"true"} />
      <Sidebar />
      <br />
      <InputForm
        admin={"true"}
        editAsset={updateAsset}
        id={asset.id}
        image={asset.image}
        owner={asset.owner}
        askingPrice={asset.askingPrice}
        noOfToken={asset.noOfToken}
        pricePerToken={asset.pricePerToken}
        ownerSubscription={asset.ownerSubscription}
        street={asset.street}
        city={asset.city}
        state={asset.state}
        country={asset.country}
        zipCode={asset.zipCode}
        description={asset.description}
        propertyType={asset.propertyType}
        builtSize={asset.builtSize}
        landSize={asset.landSize}
        yearBuilt={asset.yearBuilt}
        occupancy={asset.occupancy}
        annualGrossRent={asset.annualGrossRent}
        annualExpense={asset.annualExpense}
        noi={asset.noi}
        expectedYield={asset.expectedYield}
        invProspectHash={asset.invProspectHash}
        valuationHash={asset.valuationHash}
      />
    </>
  );
}
