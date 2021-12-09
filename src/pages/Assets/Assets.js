import React, { useState, useEffect } from 'react';
import css from './Assets.css';
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { provider } from '../../components/connectors/providers';

const { ethers } = require("ethers");
const { connectMetaMaskAccount } = require("../../components/connectors/metaMask");
const { factoryContract } = require("../../components/connectors/contracts");
const { cEthAbi} = require("../../abis/mainAbis.json");
const { signer } = require("../../components/connectors/metaMask");
const { baseContract } = require("../../components/connectors/contracts");
const { borrowedTotal } = require("../../components/utils/fetchBalances");
const { daiBorrowedBalance } = require("../../components/utils/fetchBalances");
const { etherBorrowedBalance } = require("../../components/utils/fetchBalances");
const { exchangeRate } = require("../../components/utils/fetchBalances");
const { etherSuppliedBalance } = require("../../components/utils/fetchBalances");
const { daiSuppliedBalance } = require("../../components/utils/fetchBalances");

const Assets  = () => {

    //safe is the proxy contract (base implementation with its own state)
    const [safes, setSafes] = useState([" ", " "]);
    const [proxyContract, setProxyContract] = useState("");
    const [safeButton, setSafeButton] = useState("Select a Safe");
    const [borrowedDai, setBorrowedDai] = useState("...");
    const [borrowedEther, setBorrowedEther] = useState("...");
    const [suppliedEther, setSuppliedEther] = useState("...");
    const [suppliedDai, setSuppliedDai] = useState("...");

    useEffect(async () => { 
        try {
            safeAccounts();
        } catch(err) {
            console.log(err)
        }
    }, []);

    const safeAccounts = async () => {
        try {
            const signerFactory = factoryContract.connect(signer);
            const signerAddress = await signer.getAddress();
            const currentSafes = await signerFactory.returnClones(signerAddress);
            setSafes(currentSafes);
        } catch(err) {
            console.log(err);
        }
        
    }

    const updateSafe = async (_safe) => {
        setProxyContract(_safe);
        setSafeButton(
            _safe.slice(0, 4) + "..." + _safe.slice(_safe.length - 4, )
        );
        const _daiBorrowedBalance = await daiBorrowedBalance(_safe);
        setBorrowedDai(_daiBorrowedBalance.slice(0, 6) + " " + "DAI");
        const _etherBorrowedBalance = await etherBorrowedBalance(_safe);
        setBorrowedEther(_etherBorrowedBalance.slice(0, 6) + " " + "Ether");
        const _etherSuppliedBalance = await etherSuppliedBalance(_safe);
        setSuppliedEther(_etherSuppliedBalance.slice(0, 6) + " " + "Ether");
        const _daiSuppliedBalance = await daiSuppliedBalance(_safe);
        setSuppliedDai(_daiSuppliedBalance.slice(0, 6) + " " + "DAI");
    }



    return (
        <div>
            <MainNavBar
                safes={safes}
                dropDown={Array.from(safes).map((safe, idx) => (
                    <Dropdown.Item onClick={() => updateSafe(safe)}>{safe}</Dropdown.Item>
                ))}
                safeButton= {safeButton}
            />
            <div className="table">
                <Table 
                    striped bordered hover variant="dark"
                    borderless="true"
                >
                    <thead>
                        <tr>
                        <th><h3>#</h3></th>
                        <th><h3>Asset</h3></th>
                        <th><h3>Supply Balance</h3></th>
                        <th><h3>Borrow Balance</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td><h4>1</h4></td>
                        <td><h4>Ether</h4></td>
                        <td><h5>{suppliedEther}</h5></td>
                        <td><h5>{borrowedEther}</h5></td>
                        </tr>
                        <tr>
                        <td><h4>2</h4></td>
                        <td><h4>Dai</h4></td>
                        <td><h5>{suppliedDai}</h5></td>
                        <td><h5>{borrowedDai}</h5></td>
                        </tr>  
                    </tbody>
                </Table>
            </div>
        </div>
    );
}


export default Assets;