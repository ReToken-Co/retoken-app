import React, { useContext, useState, useEffect } from "react";
import { Sidebar, Navbar } from "../components";
import { ContractContext } from "../context/ContractContext";

export default function AppAdmin() {

    const { account, initAccount, usdtContract, initUSDT, proxyContract, initProxy, logicOneContract, initLogicOne, logicTwoContract, initLogicTwo } = useContext(ContractContext);

    const [balanceUSDT, setBalanceUSDT] = useState(0);
    const [pause, setPause] = useState(0);
    const [logicContr, setLogicContr] = useState(0);
    const [adminAccess, setAdminAccess] = useState(0);
    const [tokenID, setTokenID] = useState(0);
    const [tokenOwner, setTokenOwner] = useState(0);
    const [tokenSupply, setTokenSupply] = useState(0);
    const [tokenValRpt, setTokenValRpt] = useState(0);
    const [tokenLegCont, setTokenLegCont] = useState(0);
    const [tokenFee, setTokenFee] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [newToken, setNewToken] = useState(0);
    const [usdtWithdrawn, setUSDTWithdrawn] = useState(0);
    const [buyToken, setBuyToken] = useState(0);

    useEffect(() => {
        // Get instance of usdt contract
        if (usdtContract === undefined || !usdtContract)
            initUSDT()
        console.log(`USDT contract init ${usdtContract}`)
    }, [usdtContract]);

    useEffect(() => {
        // Get instance of proxy contract
        if (proxyContract === undefined || !proxyContract)
            initProxy()
        console.log(`Proxy contract init ${proxyContract}`)
    }, [proxyContract]);

    useEffect(() => {
        // Get instance of ogicone contract
        if (logicOneContract === undefined || !logicOneContract)
            initLogicOne()
        console.log(`LogicOne contract init ${logicOneContract}`)
    }, [logicOneContract]);

    useEffect(() => {
        // Get instance of logictwo contract
        if (logicTwoContract === undefined || !logicTwoContract)
            initLogicTwo()
        console.log(`LogicTwo contract init ${logicTwoContract}`)
    }, [logicTwoContract]);

    useEffect(() => {
        // Get web3 account address
        if (account === undefined || !account)
            initAccount()
        console.log(`Current account is ${account}`)
    }, [account]);

    // display usdt balance of account (only via USDT contract)
    const displayUSDTBalance = async () => {
        const result = await usdtContract.methods.balanceOf(
            account
        ).call();
        let balance = result / 1000000000000000000;
        let balanceString = balance.toString();
        setBalanceUSDT(balanceString);
    }

    // pause the contract (only via Proxy contract)
    const pauseContract = async () => {
        await proxyContract.methods.pause().send({ from: account });
    }

    // unpause the contract (only via Proxy contract)
    const unPauseContract = async () => {
        await proxyContract.methods.unpause().send({ from: account });
    }

    // display if the contract is paused (only via Proxy contract)
    const displayPauseStatus = async () => {
        const result = await proxyContract.methods.paused().call();
        let pauseString = result.toString();
        setPause(pauseString);
    }

    // display the current logic contract set (only via Proxy contract)
    const displayLogicContr = async () => {
        const result = await proxyContract.methods._implementation().call();
        let contractString = result.toString();
        setLogicContr(contractString);
    }

    // check if account has admin access (can be via Proxy or Logic contracts)
    const checkAdminAccess = async () => {
        const result = await proxyContract.methods.hasRole(
            "0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775",
            account
        ).call();
        if (result === true) {
            setAdminAccess("Yes");
        } else {
            setAdminAccess("No");
        }
    }

    // give admin access (can be via Proxy or Logic contracts)
    const grantAdmin = async (e) => {
        e.preventDefault();
        let address = e.target.elements.newAdmin.value;
        console.log(address);

        const result = await proxyContract.methods.grantRole(
            "0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775",
            address
        ).send({ from: account });
        console.log(`${result.events.RoleGranted.returnValues[1]} is granted admin access`)
    }

    // remove admin access (can be via Proxy or Logic contracts)
    const removeAdmin = async (e) => {
        e.preventDefault();
        let address = e.target.elements.removeAdmin.value;
        console.log(address);

        const result = await proxyContract.methods.revokeRole(
            "0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775",
            address
        ).send({ from: account });
        console.log(`${result.events.RoleRevoked.returnValues[1]}'s admin access has been removed.`)
    }

    // point to new logic contract (only via Proxy contract)
    const setLogic = async (e) => {
        e.preventDefault();
        let address = e.target.elements.newLogic.value;
        console.log(address);

        const result = await proxyContract.methods.upgradeTo(
            address
        ).send({ from: account });
        console.log(`The new logic contract is ${result.events.Upgraded.returnValues[0]}.`)
    }

    // display current token ID (can be via Proxy or Logic contracts)
    const displayTokenID = async () => {
        const result = await logicOneContract.methods._tokenID().call();
        let resultString = result.toString();
        setTokenID(resultString);
    }

    // display owner of token ID (can be via Logic contracts)
    const checkOwner = async (e) => {
        e.preventDefault();
        let id = e.target.elements.id.value;

        const result = await logicOneContract.methods.getOwner(
            id
        ).call();
        console.log(result);
        let resultString = result.toString();
        setTokenOwner(resultString);
    }

    // display total supply of token ID (can be via Logic contracts)
    const checkTotalSupply = async (e) => {
        e.preventDefault();
        let id = e.target.elements.id.value;

        const result = await logicOneContract.methods.getTotalSupply(
            id
        ).call();
        console.log(result);
        let resultString = result.toString();
        setTokenSupply(resultString);
    }

    // display file hash of valuation report of token ID (can be via Logic contracts)
    const checkValRpt = async (e) => {
        e.preventDefault();
        let id = e.target.elements.id.value;

        const result = await logicOneContract.methods.getValuationRpt(
            id
        ).call();
        console.log(result);
        let resultString = result.toString();
        setTokenValRpt(resultString);
    }

    // display file hash of legal contract of token ID (can be via Logic contracts)
    const checkLegCont = async (e) => {
        e.preventDefault();
        let id = e.target.elements.id.value;

        const result = await logicOneContract.methods.getLegalContr(
            id
        ).call();
        console.log(result);
        let resultString = result.toString();
        setTokenLegCont(resultString);
    }

    // display success fee of token ID (can be via Logic contracts)
    const checkFee = async (e) => {
        e.preventDefault();
        let id = e.target.elements.id.value;

        const result = await logicOneContract.methods.getFee(
            id
        ).call();
        console.log(result);
        let resultString = result.toString();
        setTokenFee(`${resultString}%`);
    }

    // display current token ID (can be via Proxy or Logic contracts)
    const displayBalance = async (e) => {
        e.preventDefault();
        let address = e.target.elements.account.value;
        let id = e.target.elements.id.value;

        const result = await logicOneContract.methods.balanceOf(
            address,
            id
        ).call();
        console.log(result);
        let resultString = result.toString();
        setTokenBalance(resultString);
    }

    // create new ERC1155 token (can be via Logic contracts)
    const createToken = async (e) => {
        e.preventDefault();
        let owner = e.target.elements.owner.value;
        let totalTkn = e.target.elements.totalTkn.value;
        let ownerTkn = e.target.elements.ownerTkn.value;
        let valRpt = e.target.elements.val.value;
        let legCont = e.target.elements.leg.value;
        console.log(`Owner ${owner}, Total Number of Tokens ${totalTkn}, Tokens for Owner ${ownerTkn}, Valuation Report hash ${valRpt}, Legal Contract hash ${legCont}`);

        const result = await logicOneContract.methods.mintToken(
            owner,
            totalTkn,
            ownerTkn,
            valRpt,
            legCont
        ).send({ from: account });
        console.log(`mintToken result ${JSON.stringify(result)} `)
        const _time = new Date(result.events.RETokenID.returnValues.timestamp * 1000)
            .toLocaleDateString("en-US")
        console.log(`mintToken data 
            ${result.transactionHash}
            ${result.events.RETokenID.returnValues.id}
            ${result.events.RETokenID.returnValues.timestamp} 
            ${_time} `)
        setNewToken(`${result.events.RETokenID.returnValues[2]} of Token ID ${result.events.RETokenID.returnValues[1]} created.`);
    }

    // withdraw USDT from Proxy Contract (can be via Logic contracts)
    const withdrawUSDT = async (e) => {
        e.preventDefault();
        let recipient = e.target.elements.recipient.value;
        let amount = e.target.elements.amount.value;
        console.log(`Account ${account} is withdrawing ${amount} USDT to ${recipient}.`);

        const result = await logicOneContract.methods.withdrawUSDT(
            recipient,
            amount
        ).send({ from: account });
        console.log(`withdrawUSDT result ${JSON.stringify(result)}`);
        setUSDTWithdrawn(`${result.events.USDTWithdrawn.returnValues[3]} USDT withdrawn to ${result.events.USDTWithdrawn.returnValues[2]}.`);
    }

    // buy existing ERC1155 token (can be via Logic contracts)
    const tradeToken = async (e) => {
        e.preventDefault();
        let id = e.target.elements.id.value;
        let token = e.target.elements.token.value;
        let usdt = e.target.elements.usdt.value;
        console.log(`You are buying ${token} of Token ID ${id} which costs USD${usdt}.`);

        const result = await logicTwoContract.methods.buyToken(
            id,
            token,
            usdt
        ).send({ from: account });
        console.log(`buyToken result ${JSON.stringify(result)}`);
        console.log(`You have bought ${result.events.RETokenUSDT.returnValues[2]} of Token ID ${result.events.RETokenUSDT.returnValues[1]} which costs USD${result.events.RETokenUSDT.returnValues[5]}.`)
        setBuyToken(`${result.events.RETokenUSDT.returnValues[2]} of Token ID ${result.events.RETokenUSDT.returnValues[1]} bought.`);
    }

    return (
        <>
            <Navbar admin={"true"} />
            <Sidebar />
            <br />
            <div style={{ marginLeft: '500px' }}>
                <p><button onClick={displayUSDTBalance}>USDT Balance</button> : <b>{
                    balanceUSDT === 0 ? `Click on USDT balance button to display USDT balance` : balanceUSDT}</b></p>
                <br />

                <p><font size="5"><b>Proxy Functions</b></font></p>
                <p><button onClick={pauseContract}>Pause Contract</button><span> </span>
                    <button onClick={unPauseContract}>Unpause Contract</button><span> </span>
                    <button onClick={displayPauseStatus}>Pause Status</button> : <b>{
                        pause === 0 ? `Click on Pause Status button to see if the contract has been paused` : pause}</b></p>
                <p><button onClick={displayLogicContr}>Logic Contract</button> : <b>{
                    logicContr === 0 ? `Click on Logic Contract button to see the current Logic Contract set` : logicContr}</b></p>
                <p><button onClick={checkAdminAccess}>Admin Access</button> : <b>{
                    adminAccess === 0 ? `Click on Admin Access button to check if account has Admin access` : adminAccess}</b></p>
                <p><form onSubmit={grantAdmin}>
                    <b>Grant Admin Access :</b> <input type="text" name="newAdmin" size="60" placeholder="Wallet Address" />
                </form></p>
                <p><form onSubmit={removeAdmin}>
                    <b>Revoke Admin Access :</b> <input type="text" name="removeAdmin" size="60" placeholder="Wallet Address" />
                </form></p>
                <p><form onSubmit={setLogic}>
                    <b>Set New Logic Contract :</b> <input type="text" name="newLogic" size="60" placeholder="Contract Address" />
                </form></p>

                <br />
                <p><font size="5"><b>LogicOne Functions</b></font></p>
                <p><button onClick={displayTokenID}>Current Token ID</button> : <b>{
                    tokenID === 0 ? `Click on Current Token ID button to see the current Token ID` : tokenID}</b></p>
                <p><form onSubmit={checkOwner}>
                    <b>Check Owner of Token : {
                        tokenOwner === 0 ? `Fill up the field on the right` : tokenOwner}</b><span> </span>
                    <input type="text" name="id" size="10" placeholder="Token ID" />
                </form></p>
                <p><form onSubmit={checkTotalSupply}>
                    <b>Check Total Supply of Token : {
                        tokenSupply === 0 ? `Fill up the field on the right` : tokenSupply}</b><span> </span>
                    <input type="text" name="id" size="10" placeholder="Token ID" />
                </form></p>
                <p><form onSubmit={checkValRpt}>
                    <b>Check File Hash of Token's Valuation Report : {
                        tokenValRpt === 0 ? `Fill up the field on the right` : tokenValRpt}</b><span> </span>
                    <input type="text" name="id" size="10" placeholder="Token ID" />
                </form></p>
                <p><form onSubmit={checkLegCont}>
                    <b>Check File Hash of Token's Legal Contract : {
                        tokenLegCont === 0 ? `Fill up the field on the right` : tokenLegCont}</b><span> </span>
                    <input type="text" name="id" size="10" placeholder="Token ID" />
                </form></p>
                <p><form onSubmit={checkFee}>
                    <b>Check Success Fee of Token : {
                        tokenFee === 0 ? `Fill up the field on the right` : tokenFee}</b><span> </span>
                    <input type="text" name="id" size="10" placeholder="Token ID" />
                </form></p>
                <p><form onSubmit={displayBalance}>
                    <b>Check ERC1155 Token Balance : {
                        tokenBalance === 0 ? `Fill up the 2 fields below` : tokenBalance}</b>
                    <p><input type="text" name="account" size="60" placeholder="Wallet Address" /><span> </span>
                        <input type="text" name="id" size="10" placeholder="Token ID" /></p>
                    <input type="submit" value="submit" />
                </form></p>
                <p><form onSubmit={createToken}>
                    <b>Mint New Token : {
                        newToken === 0 ? `Fill up the 5 fields below` : newToken}</b>
                    <p><input type="text" name="owner" size="60" placeholder="Owner Wallet Address" /><span> </span>
                        <input type="text" name="totalTkn" size="10" placeholder="Total Token" /><span> </span>
                        <input type="text" name="ownerTkn" size="10" placeholder="Owner Token" /><span> </span>
                        <input type="text" name="val" size="60" placeholder="Valuation Report" /><span> </span>
                        <input type="text" name="leg" size="60" placeholder="Legal Report" /><span> </span></p>
                    <input type="submit" value="submit" />
                </form></p>
                <p><form onSubmit={withdrawUSDT}>
                    <b>Withdraw USDT : {
                        usdtWithdrawn === 0 ? `Fill up the 2 fields below` : usdtWithdrawn}</b>
                    <p><input type="text" name="recipient" size="60" placeholder="Recipient Address" /><span> </span>
                        <input type="text" name="amount" size="15" placeholder="Amount to withdraw" /></p>
                    <input type="submit" value="submit" />
                </form></p>
                <br />

                <p><font size="5"><b>LogicTwo Functions</b></font></p>
                <p><form onSubmit={tradeToken}>
                    <b>Buy Token : {
                        buyToken === 0 ? `Fill up the 5 fields below` : buyToken}</b>
                    <p><input type="text" name="id" size="8" placeholder="Token ID" /><span> </span>
                        <input type="text" name="token" size="15" placeholder="Number of Token" /><span> </span>
                        <input type="text" name="usdt" size="15" placeholder="Cost in USDT" /><span> </span></p>
                    <input type="submit" value="submit" />
                </form></p>
            </div>
        </>
    );
}