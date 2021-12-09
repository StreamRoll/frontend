import React, { useState, useEffect } from 'react';
import css from './Stream.css';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import Dropdown from 'react-bootstrap/Dropdown';
import { addEventListener } from 'dom-helpers';


const { ethers } = require("ethers");
const { factoryContract, baseContract } = require("../../components/connectors/contracts");
const { signer } = require("../../components/connectors/metaMask");
const { abi } = require("../../abis/StreamRollV1.json");
const { cEthAbi} = require("../../abis/mainAbis.json");
const { isSafeSelected } = require("../../components/utils/errorHandling");
const { daiTotalBalance } = require("../../components/utils/fetchBalances");

const Stream = () => {
    //It needs to default to an empty array with elements so it
    //does not error out!
    const [safes, setSafes] = useState([" ", " "]);
    const [proxyContract, setProxyContract] = useState("");
    const [safeButton, setSafeButton] = useState("Select a Safe");
    const [addressReceiver, setAddressReceiver] = useState("");
    const [amountToStream, setAmountToStream] = useState("");
    const [days, setDays] = useState("");
    const [daiBalance, setDaiBalance] = useState("Select a Safe");

    useEffect(async () => {
        try {
            safeAccounts();
        } catch(err) {
            console.log(err);
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
        const _daiBalance = await daiTotalBalance(_safe);
        setDaiBalance("Max: " + _daiBalance.slice(0, 6) + " " + "DAI");
    }

    const stream = async () => {
        if (isSafeSelected(proxyContract) === false) return "";
        const signerStreamRoll = baseContract(proxyContract, abi).connect(signer);
        await signerStreamRoll._createFlow(
            addressReceiver,
            amountToStream,
            days
        );
        alert("Stream created succesfully!");
    }

    const checkFlow = async (addr) => {
        const sDai = "0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90";
        const superDai = await baseContract(sDai, cEthAbi);
        const result = await superDai.balanceOf("0xb172f70266cF082EB38C0B7FDE42fe5c8028429A") / 1e18;
        console.log(result.toString());
    }

    const deleteFlow = async (addr) => {
        const signerStreamRoll = baseContract(addr, abi).connect(signer);
        await signerStreamRoll._deleteFlow("0x11a9E352394aDD8596594422A6d8ceA59B73aF0e");
    }

    const updateFlow = async (addr) => {
        const signerStreamRoll = baseContract(addr, abi).connect(signer);
        await signerStreamRoll._updateFlow("0xb172f70266cF082EB38C0B7FDE42fe5c8028429A", 50, 100);
    }


    
    
    return (
        <div className="stream-main">
            <MainNavBar
                safes={safes}
                dropDown={Array.from(safes).map((safe, idx) => (
                    <Dropdown.Item onClick={() => updateSafe(safe)}>{safe}</Dropdown.Item>
                ))}
                safeButton={safeButton}
            />
            <div className="stream-card">
                <Row xs={1} md={2} className="g-4">
                    <Col>
                        <Card 
                            style={{width:"40rem", height:"25rem"}}
                            bg="dark"
                        >
                            <Card.Body>
                                <Card.Title><h2>Stream</h2></Card.Title>
                               
                                    <InputGroup className="mb-3" size="lg">
                                        <FormControl
                                            placeholder="Address to: 0x..."
                                            onChange={(e) => setAddressReceiver(e.target.value)} 
                                        />
                                    </InputGroup>      
                                <InputGroup className="mb-3" size="lg">
                                    <FormControl
                                        placeholder="Duration of the Stream (in days): e.x '1'"
                                        onChange={(e) => setDays(e.target.value)} 
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3" size="lg">
                                    <FormControl
                                        placeholder={daiBalance}
                                        onChange={(e) => setAmountToStream(e.target.value)} 
                                    />
                                    <Button 
                                        variant="secondary"
                                        onClick={() => stream()}
                                    >
                                    stream
                                    </Button>
                                </InputGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}



export default Stream;