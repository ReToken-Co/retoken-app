import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { InputForm, Navbar, AddAssetDialog, UserRegister } from "../components";
import { AssetContext } from "../context/AssetContext";
import { UserContext } from "../context/UserContext";

export default function AddAsset() {
  const { assetDispatch } = useContext(AssetContext);
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const addAssetDB = async (data) => {
    console.log(`addasset ${JSON.stringify(data)}`);
    await assetDispatch({
      type: "ADD_ASSET",
      payload: {
        image: data.image,
        owner: data.owner,
        askingPrice: data.askingPrice,
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
      },
    });
    await assetDispatch({ type: "GET_ASSETS" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/marketplace");
  };

  return (
    <>
      <Navbar />
      <InputForm owner={user ? user.address : ""} addAsset={addAssetDB} />
      <AddAssetDialog open={open} handleClose={handleClose} />
      <UserRegister />
    </>
  );
}
