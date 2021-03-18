import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router";
import { AssetDetail, Navbar } from "../components";
import { AssetContext } from "../context/AssetContext";
import { UserContext } from "../context/UserContext";
import { ContractContext } from "../context/ContractContext";

export default function Asset(props) {

  const { assetDispatch } = useContext(AssetContext);
  const { user, getUser, balance } = useContext(UserContext);
  const { usdtContract, initContract } = useContext(ContractContext);
  const [asset, setAsset] = useState([]); // array stores all bids of the asset
  const [tokenInput, setTokenInput] = useState(0);
  const [investmentInput, setInvestmentInput] = useState(0);
  const [incomeInput, setIncomeInput] = useState(0);
  const location = useLocation();

  // every render or change in location
  useEffect(() => {
    let selectedAsset = {}

    if (location !== undefined) {
      // setAsset from location data
      selectedAsset = {
        id: location.state.id,
        scId: location.state.scId,
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
    console.log(`selected assets ${JSON.stringify(selectedAsset)} ${JSON.stringify(user)}
    ${location.state.admin}`);
    setAsset(selectedAsset);

  }, [location]);

  useEffect(() => {
    // Get balance of account
    if (user === undefined || !user) 
      getUser()
      console.log(`balance ${JSON.stringify(user)} ${balance}`)
  }, [user]);

  const purchaseToken = async () => {
    // Place a order into smart contract
    /*      const result = await contract.purchaseToken()

      await contract.contractBalance().then(function (_return) {
        console.log(`Contract balance aft place bid = ${_return}`)
      })
      // Update balance of wallet
      const _balance = web3.utils.fromWei(
        (await web3.eth.getBalance(account)).toString(),
        'ether')
      setBalance(Number(_balance).toFixed(4))
      console.log(`result ${JSON.stringify(result.logs[0].args.bidder, undefined, 2)}`)

      // update asset db
      assetDispatch({
        type: 'UPDATE_ASSET',
        payload: {
          id: asset.id,
          numbid: asset.numbid + 1
        }
      })

      // update new bid state & db
      bidDispatch({
        type: 'ADD_BID',
        payload: {
          assetId: asset.id,
          bidId: Number(result.logs[0].args.bidId),
          bidAmount: Number(bidInput),
          bidder: result.logs[0].args.bidder,
          dTimestamp: _dTimestamp,
          timestamp: result.logs[0].args.timstamp,
          transactionHash: result.logs[0].transactionHash
        }
      })
*/
  };

  // set tokenInput state from user input field
  const updateTokenInput = (_tokenInput) => {
    setTokenInput(_tokenInput);
    setInvestmentInput(_tokenInput * asset.pricePerToken);
    setIncomeInput(
      (_tokenInput * asset.pricePerToken * asset.expectedYield) / 100
    );
  };

  return (
    <>
      <Navbar />
      <AssetDetail
        admin={location.state.admin}
        account={user.address}
        balance={balance}
        id={asset.id}
        scId={asset.scId}
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
