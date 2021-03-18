import Web3 from "web3";

const getWeb3 = async () => {
  try {
    let web3 = {};
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      console.log("window web3 detected.");
    } else if (window.web3) {
      // Use Mist/MetaMask's provider.
      web3 = window.web3;
      console.log("Injected web3 detected.");
    } else {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
      web3 = new Web3(provider);
      console.log("No web3 instance injected, using Local web3.");
    }
    return web3;
  } catch (error) {
    console.log(`Error try to get web3 ${error}`);
    return {};
  }
};

export default getWeb3;
