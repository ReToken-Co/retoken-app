import React, { useContext, useEffect } from "react";
import { AssetContext } from "../context/AssetContext";
import { AssetCard, Navbar, Footer, UserRegister } from "../components";
import { UserContext } from "../context/UserContext";

export default function Marketplace() {
  const { assets } = useContext(AssetContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(`marketplace = ${JSON.stringify(user)}`);

  }, [user, assets]);

  return (
    <>
      <Navbar />
      <br />
      {assets
        .filter((_assettemp) => _assettemp.status !== 0)
        .map((_asset) => (
          <div className="asset" key={_asset._id}>
            <AssetCard
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
            />
            <br />
          </div>
        ))}
      <Footer />
      <UserRegister />
    </>
  );
}
