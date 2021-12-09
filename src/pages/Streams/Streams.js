import React, {useState, useEffect } from 'react';
import css from './Streams.css';
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import Button from 'react-bootstrap/Button';import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import SuperfluidSDK from "@superfluid-finance/js-sdk";


const { ethers } = require("ethers");
const { signer } = require("../../components/connectors/metaMask");
const { factoryContract } = require("../../components/connectors/contracts");
const sf = new SuperfluidSDK.Framework({
    ethers: new ethers.providers.Web3Provider(window.ethereum)
});

const Streams  = () => {

    
    //safe is the proxy contract (base implementation with its own state)
    const [safes, setSafes] = useState([" ", " "]);
    const [proxyContract, setProxyContract] = useState("");
    const [safeButton, setSafeButton] = useState("Select a Safe");
    const [streams, setStreams] = useState([]);

    useEffect(async () => {
        try {
            safeAccounts();
        } catch(err) {
            console.log(err);
        }
    }, []);

    const streamingStatus = async (_safe) => {
        await sf.initialize();
        const result = await sf.cfa.listFlows({
            superToken:"0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90",
            account:_safe
        });
        setStreams(result.outFlows);
        const user = sf.user({
            address: _safe,
            token: "0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90"
        });
        console.log("user -->", (await user.details()).cfa.flows);
    }

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
        streamingStatus(_safe);
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
                        <th><h3>Streaming To</h3></th>
                        <th><h3>Currency</h3></th>
                        <th><h3>Flow Rate</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from(streams).map((stream, idx) => (
                            <tr>
                                <td><h4>{idx + 1 }</h4></td>
                                <td><h4>{streams[idx].receiver}</h4></td>
                                <td><h4>Dai</h4></td>
                                <td><h4>{streams[idx].flowRate}</h4></td>
                            </tr>
                        ))}
                     
                    </tbody>
                </Table>
            </div>
        </div>
    );
}




export default Streams;


