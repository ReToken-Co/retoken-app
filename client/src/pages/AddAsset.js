import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { InputForm, Navbar, AddAssetDialog } from "../components";
import { AssetContext } from "../context/AssetContext";
import { UserContext } from "../context/UserContext";
import { UserRegContext } from "../context/UserRegContext";

export default function AddAsset() {
  const { assetDispatch } = useContext(AssetContext);
  const { user } = useContext(UserContext);
  const { setFormOpen } = useContext(UserRegContext);
  const history = useHistory();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user || !user.email) setFormOpen(true)
    else setFormOpen(false)
  }, [user])

  const addAssetDB = async (data) => {

    if (!user || !user.email) {
      setFormOpen(true)
    } else {
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
    }
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
    </>
  );
}
