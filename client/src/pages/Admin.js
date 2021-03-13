import React, { useContext, useState } from "react";
import { AssetCard, Sidebar } from "../components";
import { AssetContext } from "../context/AssetContext";

export default function Admin() {
  const { assets, assetDispatch } = useContext(AssetContext);
  const [propertyStatus, setPropertyStatus] = useState(0);

//  console.log (`admin asset ${JSON.stringify(assets)}`)

  const updateStatusInput = (_statusInput) => {
    console.log(`menu status ${_statusInput}`);
    setPropertyStatus(_statusInput);
  };

  return (
    <>
      <Sidebar updateStatusInput={updateStatusInput} />
      <br />
      {assets
        .filter((_assettemp) => _assettemp.status === propertyStatus)
        .map((_asset) => (
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
              admin={true}
            />
            <br />
          </div>
        ))}
    </>
  );
}
