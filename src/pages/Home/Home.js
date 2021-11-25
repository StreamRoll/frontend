import React, { useState, useEffect } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Logo from "../../components/Logo/Logo";
import Connect from "../../components/Connect/Connect";
import Text from "../../components/Text/Text";
import Cards from "../../components/Cards/Cards";
import css from "./Home.css";

const { ethers } = require("ethers");

const { connectMetaMaskAccount } = require("../../components/connectors/metaMask");
const { signer } = require("../../components/connectors/metaMask");
const { factoryContract } = require("../../components/connectors/contracts");
const { baseContract } = require("../../components/connectors/contracts");
const { abi } = require("../../abis/StreamRollV1.json");
const { cEthBalance } = require("../../components/utils/fetchBalances");
const { daiBalance } = require("../../components/utils/fetchBalances");


const Home = () => {
  const [supplyAmount, setSupplyAmount] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [collateralBalance, setCollateralBalance] = useState(
    "Connect your wallet & Safe"
  );
  const [retrieveAmount, setRetrieveAmount] = useState("");
  const [amountToBorrow, setAmountToBorrow] = useState("");
  const [borrowedDai, setBorrowedDai] = useState("Connect your wallet & Safe");
  const [repayAmount, setRepayAmount] = useState("");
  const [button, setButton] = useState("Choose your Safe");
  const [safes, setSafes] = useState("");
  // Proxy Contract is the identincal child clone of StreamRollV1
  const [proxyContract, setProxyContract] = useState("");
  

  useEffect(async () => {
    try {
      allAccounts();
    }catch(err) {
        console.log(err);
    }
  }, []);

  const connectAccount = async () => {
    await connectMetaMaskAccount();
    setUserAddress(await signer.getAddress());
    alert("You are connected");
}

  // Supplies eth to compound protocol, gets CEth in return
  const supplyEth = async () => {
    if (supplyAmount <= 0) {
      alert("You need to supply more than 0 ETH");
      return;
    }
    if (isNaN(supplyAmount) === true) {
      alert("You need to type numbers");
      return;
    }
    const signerStreamRoll = baseContract(proxyContract, abi).connect(signer);
    await signerStreamRoll.supplyEthToCompound({
      value: ethers.utils.parseEther(supplyAmount.toString())
    });
  }

  // There needs to be supplied eth, then the owner can borrow dai
  const _borrow = async () => {
    try {
      const signerStreamRoll = baseContract(proxyContract, abi).connect(signer);
      const amount = ethers.utils.parseEther(amountToBorrow);
      const result = await signerStreamRoll.borrowFromCompound(amount);
    } catch(err) {
        alert(err);
    }
  }

  // Transfers the amount back to the owner's account. 
  const transferEthBack = async () => {
    if (retrieveAmount <= 0) {
      alert("0 or negative amounts are invalid");
      return;
    }
    if (isNaN(retrieveAmount) === true) {
      alert("You need to type numbers");
      return;
    }
    try {
      const signerStreamRoll = baseContract(proxyContract, abi).connect(signer);
      await signerStreamRoll.getEtherBack(ethers.utils.parseEther(retrieveAmount.toString()));
    } catch(err) {
        alert(err);
    }
    
  }

  //Repays "x" amount of underlying debt
  const _repayDebt = async () => {
    try {
      const signerStreamRoll = baseContract(proxyContract, abi).connect(signer);
      const amount = ethers.utils.parseEther(repayAmount);
      const result = await signerStreamRoll.repayDebt(amount);
    } catch(err) {
        alert(err);
    }   
  }
  
  //Shows all accounts (safes) that the dao (user) has created
  const allAccounts = async () => {
    const signerFactory = factoryContract.connect(signer);
    const signerAddress = await signer.getAddress();
    const result = await signerFactory.returnClones(signerAddress.toString());
    setSafes(result);
  }

  const triggerButton = async (_safe) => {
    // Proxy Contract is the identincal child clone of StreamRollV1
    setProxyContract(_safe);
    setButton(_safe);
    setCollateralBalance(await cEthBalance(_safe) + " " + " cEth");
    setBorrowedDai(await daiBalance(_safe) + " " + "Dai");
  }
  
  return (
    <div className="Home">
      <Logo />
      <div className="drop-down">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {button}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Array.from(safes).map((safe, idx) => (
                  <Dropdown.Item onClick={() => triggerButton(safe)}>{safe}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
      <Connect onClick={() => connectAccount()} userAddress={userAddress} />
      <div className="Text">
        <Text />
      </div>

      <Cards
        title1="Supplied Balance"
        text1={collateralBalance}
        placeholder1="Supply ETH"
        onChange1={(e) => setSupplyAmount(e.target.value)}
        button1="Supply"
        onClick1={() => supplyEth()}
        title2="Borrowed Dai"
        text2={borrowedDai}
        placeholder2="Amount to Borrow - 'Dai'"
        onChange2={(e) => setAmountToBorrow(e.target.value)}
        button2="Borrow"
        onClick2={() => _borrow()}
        placeholder2a="Amount to Repay - 'Dai'"
        onChange2a={(e) => setRepayAmount(e.target.value)}
        button2a="Repay"
        onClick2a={() => _repayDebt()}
        title3="Send ETH back to my account"
        placeholder3="amount to send"
        onChange3={(e) => setRetrieveAmount(e.target.value)}
        button3="Send"
        onClick3={() => transferEthBack()}
      />
    </div>
  );
}


export default Home;
 