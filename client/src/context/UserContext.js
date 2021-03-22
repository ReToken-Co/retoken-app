import React, { createContext, useState } from "react";
import axios from "axios";
import getWeb3 from "../utils/getWeb3";

// Create Context
export const UserContext = createContext();

// Provider Component
const UserContextProvider = (props) => {
  const [user, setUser] = useState();
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState(0);

  const addUser = async (payload) => {
    console.log(`add user ${JSON.stringify(payload)}`)
    axios
      .post(`/users/add`, payload)
      .then((res) => {
        console.log(`New User added: ${JSON.stringify(res.data)}`);
        // Set State
        setUser(res.data);
      })
      .catch((err) => {
        console.log(`Error adding new user ${err}`);
      });
  };

  const getUser = async () => {
    try {
      const web3 = await getWeb3();
      // Get connected wallet address
      const accounts = await web3.eth.getAccounts();

      if (accounts && accounts.length > 0) {
        // find user record in db
        axios
          .get(`/users/findByAddress`, {
            params: { address: accounts[0].toString() },
          })
          .then((res) => {
            console.log(`getUser ${JSON.stringify(res.data)}`);

            // Set State
            if (res.data) setUser(res.data);
            else setUser({ address: accounts[0].toString() });
          })
          .catch((err) => {
            console.log(`Error retrieving user data ${err}`);
          });

        const _balance = Number(
          await web3.utils.fromWei(
            (await web3.eth.getBalance(accounts[0])).toString(),
            "ether"
          )
        ).toFixed(4);
        setBalance(_balance);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAccount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      if (accounts && accounts.length > 0) setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getBal = async () => {
    try {
      const web3 = await getWeb3();
      // Get balance of connected wallet
      const accounts = await web3.eth.getAccounts();
      if (accounts && accounts.length > 0) {
        setBalance(
          Number(
            await web3.utils.fromWei(
              (await web3.eth.getBalance(accounts[0])).toString(),
              "ether"
            )
          ).toFixed(4)
        );
        console.log(`getbal ${balance}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, getUser, addUser, account, getAccount, balance, getBal }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
