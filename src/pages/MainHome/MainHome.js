import React, { useState } from 'react';
import css from './MainHome.css';
import MainHomeCards from './MainHomeCards';
import Connect from '../../components/Connect/Connect';

const { connectMetaMaskAccount } = require("../../components/connectors/metaMask");
const { signer } = require("../../components/connectors/metaMask");
const {factoryContract} = require("../../components/connectors/contracts");

const MainHome = () => {
    const [userAddress, setUserAddress ] = useState("");

    const connectAccount = async () => {
            await connectMetaMaskAccount();
            setUserAddress(await signer.getAddress());
            alert("You are connected");
        }

    const createSafe = async () => {
        const signerContract = factoryContract.connect(signer);
        await signerContract._clone();
        alert("Safe created Succesfully!");
        
    }
   
    return (
        <div>
            <div className="Connect">
            <Connect onClick={() => connectAccount()} userAddress={userAddress} />
            </div>
            <MainHomeCards
                text1="If you already have an account (safe) with us, continue to home"
                text2="I would like to create an account (safe)"
                onClick2={() => createSafe()}
            />
        </div>
    );
}


export default MainHome;
