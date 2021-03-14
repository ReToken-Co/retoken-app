import React, { createContext, useState, useEffect } from "react";
import TruffleContract from "@truffle/contract";
import RetokenContract from "../abis/ReTokenApp.json"; // my smart contract abi
import getWeb3 from "../utils/getWeb3"

// Create Context
export const ContractContext = createContext();

// Provider Component
const ContractContextProvider = (props) => {

  const [contract, setContract] = useState();

  const initContract = async () => {
    try {
      const web3 = await getWeb3()
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = RetokenContract.networks[networkId]
      const contract = new web3.eht.Contract(
        RetokenContract.abi,
        deployedNetwork && deployedNetwork.address
      )
/*
      instance.setProvider(web3Provider)
      const _contract = await instance.deployed()
  */
      setContract(contract)

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContractContext.Provider value={{ contract, initContract }}>
      {props.children}
    </ContractContext.Provider>
  );
};

export default ContractContextProvider;
