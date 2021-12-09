import React, {useState, useEffect} from 'react';
import css from './SupplyAndBorrow.css';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MainNavBar from "../../components/MainNavBar/MainNavBar";

const { ethers } = require("ethers");
const { factoryContract } = require("../../components/connectors/contracts");
const { provider }  = require('../../components/connectors/providers');
const { signer } = require("../../components/connectors/metaMask");
const { baseContract } = require("../../components/connectors/contracts");
const { abi } = require("../../abis/StreamRollV1.json");
const { isSafeSelected } = require("../../components/utils/errorHandling");
const { _ethBalance } = require("../../components/utils/fetchBalances");
const { maxDaiToBorrow } = require("../../components/utils/fetchBalances");


const SupplyAndBorrow = () => {
    //It needs to default to an empty array with elements so it
    //does not error out!
    const [safes, setSafes] = useState([" ", " "]);
    const [proxyContract, setProxyContract] = useState("");
    const [borrowAmount, setBorrowAmount] = useState("");
    const [supplyAmount, setSupplyAmount] = useState("");
    const [safeButton, setSafeButton] = useState("Select a Safe");
    const [ethBalance, setEthBalance] = useState("Select a Safe");
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
        }  catch(err) {
            console.log(err);
        }
        
    }

    const updateSafe = async (_safe) => {
        setSafeButton(
            _safe.slice(0, 4) + "..." + _safe.slice(_safe.length - 4, )
            );
        setProxyContract(_safe);
        const userAddress = await signer.getAddress();
        const balance = await _ethBalance(userAddress);
        setEthBalance("Supply Amount. Max: " + " " + balance.slice(0, 6) + " ETH");
        const daiBalance = await maxDaiToBorrow(_safe);
        setDaiBalance("Borrow. Max: " + " " + daiBalance.toString().slice(0,6) + " DAI");
    }

    const supply = async () => {
        if (isSafeSelected(proxyContract) === false) return "";
        try {
            const signerStreamRoll = baseContract(proxyContract, abi).connect(signer);
            const amount = ethers.utils.parseEther(supplyAmount);
            await signerStreamRoll.supplyEthToCompound({
                value:amount
            }
            );
        } catch(err) {
            alert(err);
        }
        alert("Your transfer is on the way!");
    }

    const borrow = async () => {
        if (isSafeSelected(proxyContract) === false) return "";
        try {
            const signerStreamRoll = baseContract(proxyContract, abi).connect(signer);
            const amount = ethers.utils.parseEther(borrowAmount.toString());
            await signerStreamRoll.borrowFromCompound(amount);
        } catch(err) {
            alert(err);
        }
    }

    return (
        <div className="supply-borrow">  
            <MainNavBar 
                safes={safes}
                dropDown={Array.from(safes).map((safe, idx) => (
                    <Dropdown.Item onClick={() => updateSafe(safe)}>{safe}</Dropdown.Item>
                ))}
                safeButton= {safeButton}
            />
        <div className="l-b-cards">
            <Row xs={1} md={2} className="g-4">
                <Col>
                    <div className="lb-card1">
                        <Card 
                            style={{width:"40rem", height:"35rem"}}
                            bg="dark"
                        >  
                            <Card.Body>
                            <Card.Title><h2>Supply & Borrow</h2></Card.Title>
                            <Card.Text>
                            </Card.Text>
                            <InputGroup className="mb-3" size="lg">
                                <FormControl
                                    placeholder= {ethBalance}
                                    onChange={(e) => setSupplyAmount(e.target.value)} 
                                />
                                <Button 
                                    variant="secondary"
                                    onClick={() => supply()}
                                >
                                supply
                                </Button>
                            </InputGroup>
                            <div className="input-2">
                                <InputGroup className="mb-3" size="lg">
                                    <FormControl
                                        placeholder={daiBalance}
                                        onChange={(e) => setBorrowAmount(e.target.value)} 
                                    />
                                    <Button 
                                        variant="secondary"
                                        onClick={() => borrow()}
                                    >
                                    borrow
                                    </Button>
                                </InputGroup>
                            </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
        </div>
    );
}



export default SupplyAndBorrow;