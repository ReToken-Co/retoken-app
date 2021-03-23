import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { InputForm, Sidebar, Navbar } from "../components";
import { AssetContext } from "../context/AssetContext";
import { UserContext } from "../context/UserContext";

export default function EditAsset() {
  const { assets, assetDispatch } = useContext(AssetContext);
  const { user } = useContext(UserContext);
  const [asset, setAsset] = useState([]); // state of 1 selected asset
  const location = useLocation();
  const history = useHistory();

  // Set asset state
  useEffect(() => {
    // Set asset state
    let selectedAsset = {};
    if (assets !== undefined && assets.length > 0) {
      if (location !== undefined)
        selectedAsset = assets.find(
          (_asset) => _asset._id === location.state.id
        );
      else
        selectedAsset = assets.find(
          (_asset) => _asset._id === localStorage.getItem("AssetId")
        );
      setAsset(selectedAsset);
    } else
      console.log(
        `no assets ${assets} ${location.state.id} ${localStorage.getItem(
          "AssetId"
        )}`
      );
  }, [location, user]);

  const updateAsset = async (data) => {
    //    console.log(`editasset ${JSON.stringify(data)}`);
    await assetDispatch({
      type: "UPDATE_ASSET",
      payload: {
        id: asset._id,
        image: data.image,
        owner: data.owner,
        askingPrice: data.askingPrice,
        noOfToken: data.noOfToken,
        pricePerToken: data.pricePerToken,
        ownerSubscription: data.ownerSubscription,
        successFee: data.successFee,
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
        id={asset._id}
        image={asset.image}
        owner={asset.owner}
        askingPrice={asset.askingPrice}
        noOfToken={asset.noOfToken}
        pricePerToken={asset.pricePerToken}
        ownerSubscription={asset.ownerSubscription}
        successFee={asset.successFee}
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
