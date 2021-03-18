import React, { createContext, useState, useEffect } from "react";
import USDTContract from "../abis/USDT.json"; // my smart contract abi
import RETokenProxy from "../abis/RETokenProxy.json"; // my smart contract abi
import RETokenLogicOne from "../abis/LogicOne.json"; // my smart contract abi
import RETokenLogicTwo from "../abis/LogicTwo.json"; // my smart contract abi
import getWeb3 from "../utils/getWeb3"

// Create Context
export const ContractContext = createContext();

// Provider Component
const ContractContextProvider = (props) => {

  const [usdtContract, setUSDTContract] = useState();
  const [proxyContract, setProxyContract] = useState();
  const [logicOneContract, setLogicOneContract] = useState();
  const [logicTwoContract, setLogicTwoContract] = useState();
  const [account, setAccount] = useState();

  const initUSDT = async () => {
    try {
      const web3 = await getWeb3()
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = USDTContract.networks[networkId]
      const usdtContract = new web3.eth.Contract(
        USDTContract.abi,
        deployedNetwork && deployedNetwork.address
      )
      setUSDTContract(usdtContract)
    } catch (error) {
      console.error(error);
    }
  };

  const initProxy = async () => {
    try {
      const web3 = await getWeb3()
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = RETokenProxy.networks[networkId]
      const proxyContract = new web3.eth.Contract(
        RETokenProxy.abi,
        deployedNetwork && deployedNetwork.address
      )
      setProxyContract(proxyContract)
    } catch (error) {
      console.error(error);
    }
  };

  const initLogicOne = async () => {
    try {
      const web3 = await getWeb3()
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = RETokenLogicOne.networks[networkId]
      const logicOneContract = new web3.eth.Contract(
        RETokenLogicOne.abi,
        deployedNetwork && deployedNetwork.address
      )
      setLogicOneContract(logicOneContract)
    } catch (error) {
      console.error(error);
    }
  };

  const initLogicTwo = async () => {
    try {
      const web3 = await getWeb3()
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = RETokenLogicTwo.networks[networkId]
      const logicTwoContract = new web3.eth.Contract(
        RETokenLogicTwo.abi,
        deployedNetwork && deployedNetwork.address
      )
      setLogicTwoContract(logicTwoContract)
    } catch (error) {
      console.error(error);
    }
  };

  const initAccount = async () => {
    try {
      const web3 = await getWeb3()
      const accounts = await web3.eth.getAccounts()
      const account = accounts[0]
      setAccount(account)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContractContext.Provider value={{ account, initAccount, usdtContract, initUSDT, proxyContract, initProxy, logicOneContract, initLogicOne, logicTwoContract, initLogicTwo }}>
      {props.children}
    </ContractContext.Provider>
  );
};

export default ContractContextProvider;
