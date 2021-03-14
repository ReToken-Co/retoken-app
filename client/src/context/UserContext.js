import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import getWeb3 from "../utils/getWeb3"

// Create Context
export const UserContext = createContext();

// Provider Component
const UserContextProvider = (props) => {
  const [user, setUser] = useState();

  const getUser = async () => {
    try {
      const web3 = await getWeb3()
      // Get connected wallet, networkID and Contract
      const accounts = await web3.eth.getAccounts();

      // find user record in db
      axios.get(`/users/findByAddress`, {params: { address: accounts[0].toString() }})
        .then((res) => {
          console.log(`user ${JSON.stringify(res.data)}`);
          // Set State
          setUser(res.data);
        })
        .catch((err) => {
          console.log(`Error retrieving user data ${err}`);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
