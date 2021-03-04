import React, { createContext, useState, useEffect } from 'react'
import Web3 from 'web3'
import TruffleContract from '@truffle/contract'
import AuctionContract from '../abis/ReTokenApp.json'  // my smart contract abi

// Create Context
export const Web3Context = createContext()

// Provider Component
const Web3ContextProvider = (props) => {
    const [account, setAccount] = useState()
    const [web3, setWeb3] = useState()
    const [contract, setContract] = useState()

    useEffect(() => {
        const initWeb3 = async () => {
            try {
                // get network provider and web3 instance
                let web3Provider = {}
                if (window.ethereum) {
                    web3Provider = window.ethereum
                } else if (window.web3) {
                    web3Provider = window.web3.currentProvider
                } else {
                    web3Provider = Web3.providers.HttpProvider('http://localhost:7545')
                }
                const _web3 = new Web3(web3Provider)

                // Get connected wallet, networkID and Contract
                const accounts = await _web3.eth.getAccounts()
                // Set State
                setAccount(accounts[0])
                console.log(`getaccount ${accounts[0]} ${account}`)

                const instance = TruffleContract(AuctionContract)
                instance.setProvider(web3Provider)
                const _contract = await instance.deployed()
                setContract(_contract)
                setWeb3(_web3)
                //            return (web3Provider)
            } catch (error) {
                console.error(error)
            }
        }
        initWeb3()
    }, [])

    return (
        <Web3Context.Provider value={{ account, contract, web3 }}>
            { props.children}
        </Web3Context.Provider>
    )
}

export default Web3ContextProvider