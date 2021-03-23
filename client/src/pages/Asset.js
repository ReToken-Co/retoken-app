import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router";
import { AssetDetail, Navbar } from "../components";
import { AssetContext } from "../context/AssetContext";
import { UserContext } from "../context/UserContext";
import { TransactionContext } from "../context/TransactionContext";
import { ContractContext } from "../context/ContractContext";
import { UserRegContext } from "../context/UserRegContext";

export default function Asset() {
  const { assets, assetDispatch } = useContext(AssetContext);
  const { transactionDispatch } = useContext(TransactionContext);
  const { user } = useContext(UserContext);
  const { setFormOpen } = useContext(UserRegContext);
  const { logicTwoContract, initLogicTwo, usdtContract, initUSDT } = useContext(
    ContractContext
  );
  const [asset, setAsset] = useState([]); // state of 1 selected asset
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [tokenInput, setTokenInput] = useState(0);
  const [investmentInput, setInvestmentInput] = useState(0);
  const [incomeInput, setIncomeInput] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Set LogicTwoContract state
    const getLogicTwoContract = async () => {
      await initLogicTwo();
    };
    if (logicTwoContract === undefined || !logicTwoContract)
      getLogicTwoContract();

    // Set USDTContract state
    const getUSDTContract = async () => {
      await initUSDT();
    };
    if (usdtContract === undefined || !usdtContract) getUSDTContract();
  }, []);

  useEffect(() => {
    // Set asset state
    let selectedAsset = {};
    if (assets !== undefined && assets.length > 0) {
      if (location.state !== undefined) {
        selectedAsset = assets.find(
          (_asset) => _asset._id === location.state.id
        );
        localStorage.setItem("AssetId", location.state.id);
      } else
        selectedAsset = assets.find(
          (_asset) => _asset._id === localStorage.getItem("AssetId")
        );
      setAsset(selectedAsset);
    } else
      console.log(`no assets ${assets} ${localStorage.getItem("AssetId")}`);
  }, [location, user]);

  useEffect(() => {
    // set USDT balance state
    const getUsdtBalance = async () => {
      if (usdtContract && user) {
        const result = await usdtContract.methods
          .balanceOf(user.address)
          .call();
        let balance = Number((result / 1000000000000000000).toFixed(0)).toLocaleString("en");
        console.log(`USDT ${balance}`)
        setUsdtBalance(balance);
        localStorage.setItem("USDTBalance", balance);
      } else {
        console.log(
          `missing data for smart contract: account=${
            user ? user.address : undefined
          }, contract=${usdtContract}`
        );
      }
    };
    getUsdtBalance();
  }, [user, usdtContract]);

  const purchaseToken = async (e) => {
    e.preventDefault();

    if (!user || !user.email) {
      setFormOpen(true);
    } else {
      if (!logicTwoContract) {
        console.log(`Lost contract, run initLogicTwo`);
        await initLogicTwo();
        console.log(`logi2 ${JSON.stringify(logicTwoContract)}`);
      }

      // console.log(
      //   `purchase ${tokenInput} ${investmentInput} ${asset._id} ${asset.tokenId}
      //     ${logicTwoContract}`
      // );

      if (asset && logicTwoContract && user) {
        const _subscription = (
          (((asset.subscription / 100) * asset.noOfToken + Number(tokenInput)) /
            asset.noOfToken) *
          100
        ).toFixed(1);
        console.log(
          `subscription  ${asset.subscription}  ${asset.noOfToken} ${tokenInput} ${_subscription}`
        );

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

        setAsset({ ...asset, subscription: _subscription });

        // Update properties State & DB
        await assetDispatch({
          type: "UPDATE_ASSET",
          payload: {
            id: asset._id,
            subscription: _subscription,
          },
        });
        await assetDispatch({ type: "GET_ASSETS" });
        await transactionDispatch({
          type: "GET_TX_BY_PROPERTY",
          payload: asset._id,
        });
        console.log(`updated tx ${user.address} ${asset._id} ${_subscription}
                        ${result.transactionHash} `);
      } else {
        console.log(`missing data for smart contract: assetID= ${
          asset._id
        }, account=${user ? user.address : undefined}, 
        tokenID=${
          asset ? asset.tokenId : undefined
        } # of token to purchase=${tokenInput} USDT=${investmentInput}`);
      }
    }
  };

  // set tokenInput state from user input field
  const updateTokenInput = (_tokenInput) => {
    setTokenInput(_tokenInput);
    setInvestmentInput(_tokenInput * asset.pricePerToken);
    setIncomeInput(
      (_tokenInput * asset.pricePerToken * asset.expectedYield) / 100
    );
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
        admin={location.state && location.state.admin ? true : false}
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
