import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router";
import { AssetDetail, Navbar } from "../components";
import { AssetContext } from "../context/AssetContext";
import { UserContext } from "../context/UserContext";
import { TransactionContext } from "../context/TransactionContext";
import { ContractContext } from "../context/ContractContext";

export default function Asset() {
  const { assetDispatch } = useContext(AssetContext);
  const { transactionDispatch } = useContext(TransactionContext);
  const { user } = useContext(UserContext);
  const { logicTwoContract, initLogicTwo, usdtContract, initUSDT } = useContext(
    ContractContext
  );
  const [asset, setAsset] = useState([]); // state of 1 selected asset
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [tokenInput, setTokenInput] = useState(0);
  const [investmentInput, setInvestmentInput] = useState(0);
  const [incomeInput, setIncomeInput] = useState(0);
  const location = useLocation();

  // every render or change in location
  useEffect(() => {
    // Set LogicTwoContract state
    const getLogicTwoContract = async () => {
      await initLogicTwo();
    };
    if (logicTwoContract === undefined || !logicTwoContract)
      getLogicTwoContract()

    // Set USDTContract state
    const getUSDTContract = async () => {
      await initUSDT();
    };
    if (usdtContract === undefined || !usdtContract)
      getUSDTContract()

    // Set asset state
    let selectedAsset = {};
    if (location !== undefined) {
      // setAsset from location data
      selectedAsset = {
        _id: location.state.id,
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
      };
      localStorage.setItem("AssetId", location.state.id);
    } else {
      // dispatch to get asset record from DB
      const _id = localStorage.getItem("AssetId");
      selectedAsset = assetDispatch({
        type: "GET_ASSET",
        payload: _id,
      });
    }

    // set asset State
    console.log(
      `selected assets ${selectedAsset} ${JSON.stringify(user)} ${
        location.state.admin
      }`
    );
    setAsset(selectedAsset);
  }, []);

  useEffect(() => {
    // set USDT balance state
    const getUsdtBalance = async () => {
      if (usdtContract && user) {
        const result = await usdtContract.methods
          .balanceOf(user.address)
          .call();
        let balance = result / 1000000000000000000;
        setUsdtBalance(balance);
        localStorage.setItem("USDTBalance", balance);
      } else {
        console.log(`missing data for smart contract: account=${ user ? user.address : undefined }, contract=${usdtContract}`);
      }
    };
    getUsdtBalance();
  }, [user, usdtContract]);

  const purchaseToken = async (e) => {
    e.preventDefault();

    if (!logicTwoContract) {
      console.log(`Lost contract, run initLogicTwo`);
      await initLogicTwo();
      console.log(`logi2 ${JSON.stringify(logicTwoContract)}`);
    }

    console.log(
      `purchase ${tokenInput} ${investmentInput} ${asset._id} ${asset.tokenId}
        ${logicTwoContract}`
    );

    if (asset && logicTwoContract && user) {
      // Buy Property Token
      const result = await logicTwoContract.methods
        .buyToken(asset.tokenId, tokenInput, investmentInput)
        .send({ from: user.address });

      console.log(`BuyToken result ${result.transactionHash} 
      ${JSON.stringify(result.events.RETokenUSDT.returnValues)}`);

      localStorage.setItem(
        "USDTBalance",
        localStorage.getItem("USDTBalance") - investmentInput
      );
      setUsdtBalance(usdtBalance - investmentInput);

      // Add transaction State & DB
      await transactionDispatch({
        type: "ADD_TRANSACTION",
        payload: {
          investor: user.address,
          propertyId: asset._id,
          noOfToken: tokenInput,
          transactionHash: result.transactionHash,
          transactionDate:
            result.events.RETokenUSDT.returnValues.timestamp * 1000,
        },
      });

      const _subscription = (((asset.subscription / 100 * asset.noOfToken) + tokenInput) / asset.noOfToken * 100 ).toFixed(1);
//      console.log(`subscription  ${asset.subscription}  ${asset.noOfToken} ${tokenInput} ${_subscription}`)
      setAsset({ ...asset, subscription: _subscription })

      // Update properties State & DB
      assetDispatch({
        type: "UPDATE_ASSET",
        payload: {
          id: asset._id,
          subscription: _subscription,
        },
      });

      console.log(`updated asset ${user.address} ${asset._id} ${_subscription}
              ${result.transactionHash} `);
    } else {
      console.log(`missing data for smart contract:\ne assetID=${
        asset._id
      }, account=${user ? user.address : undefined}, 
      tokenID=${
        asset ? asset.tokenId : undefined
      } # of token to purchase=${tokenInput} USDT=${investmentInput}`);
    }
  };

  // set tokenInput state from user input field
  const updateTokenInput = (_tokenInput) => {
    setTokenInput(_tokenInput);
    setInvestmentInput(_tokenInput * asset.pricePerToken);
    setIncomeInput( (_tokenInput * asset.pricePerToken * asset.expectedYield) / 100 );
  };

  if (!asset) {
    return (
      <div>
        <h1 style={{ marginLeft: "500px" }}>Refresh Page Please....</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <AssetDetail
        admin={location.state.admin}
        account={user ? user.address : ""}
        balance={
          usdtBalance > 0 ? localStorage.getItem("USDTBalance") : usdtBalance
        }
        id={asset._id}
        tokenId={asset.tokenId}
        image={asset.image}
        transactionHash={asset.transactionHash}
        invProspectHash={asset.invProspectHash}
        valuationHash={asset.valuationHash}
        subscription={asset.subscription}
        status={asset.status}
        owner={asset.owner}
        askingPrice={asset.askingPrice}
        noOfToken={asset.noOfToken}
        pricePerToken={asset.pricePerToken}
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
        investmentInput={investmentInput}
        incomeInput={incomeInput}
        updateTokenInput={updateTokenInput}
        purchaseToken={purchaseToken}
      />
    </>
  );
}
