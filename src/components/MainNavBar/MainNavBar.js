import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from "react-router-dom";

import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import css from './MainNavBar.css';
import logo from '../../images/logo.png';

const { factoryContract } = require("../../components/connectors/contracts");
const { connectMetaMaskAccount } = require("../../components/connectors/metaMask");
const { signer } = require("../../components/connectors/metaMask");
const { ethers } = require("ethers");

const MainNavBar = (props) => {

    useEffect(async () => {
        try {
            const signerAddress = await signer.getAddress();
            setConnectButton(
                signerAddress.slice(0, 5) +
                "..." + signerAddress.slice(signerAddress.length -4, )
                );
        } catch(err) {
            console.log(err);
        }
    }, []);

    const [connectButton, setConnectButton ] = useState("Connect Wallet");
 
    const connectAccount = async () => {
        await connectMetaMaskAccount();
        const address = await signer.getAddress();

        setConnectButton(
            address.slice(0, 5)  +
             "..." + address.slice(address.length -4, ));
        alert("You are connected");
    }

    const deployNewSafe = async () => {
        const signerFactory = factoryContract.connect(signer);
        await signerFactory._clone();
        alert("Your safe is on the process of being created!");
    }


    return (
        <div className="nav-bar">

                <Navbar collapseOnSelect expand="sm">
                <div className="logo">
                            <img src={logo} width="70"/>
                        </div>
                    <Container>
                        <Nav className="me-auto">
                        <div className="dashboard">
                        <Dropdown>
                                <Dropdown.Toggle 
                                    variant="dark" 
                                    id="dropdown-basic"
                                    size="lg"
                            >
                                    Dashboard
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                <div className="link1">
                                    <Dropdown.Item><Link to="/streams">Streams</Link></Dropdown.Item>
                                </div>
                                <Dropdown.Item><Link to="/assets">Assets</Link></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="supply-and-borrow">
                       <Link to="/supply-and-borrow"> 
                            <Button 
                                    variant="dark" 
                                    size="lg"
                                    
                            >
                                    Supply & Borrow
                            </Button>
                        </Link>
                        </div>
                        <div className="stream">
                            <Link to="/stream">
                                <Button 
                                        variant="dark" 
                                        size="lg"
                                            
                                >
                                    Stream
                                </Button>
                            </Link>
                        </div>
                        </Nav>
                        <Nav>
                        <div className="deploy-safe-button">
                            <Button 
                                variant="dark" 
                                size="lg"
                                onClick={() => deployNewSafe()}
                                >
                                Deploy New Safe
                            </Button>
                        </div>
                        <div className="drop-down">
                            <Dropdown>
                                <Dropdown.Toggle 
                                    variant="dark" 
                                    id="dropdown-basic"
                                    size="lg"
                            >
                                    {props.safeButton}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {props.dropDown}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="account-button">
                            <Button 
                                variant="success" 
                                size="lg"
                                onClick={() => connectAccount()}
                            >
                                {connectButton}
                            </Button>
                        </div>
                        
                        </Nav>
                    </Container>
                </Navbar>   
              
        </div>
    );
}



export default MainNavBar;

