import React from 'react';
import css from './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../../images/logo.png';
import enterApp from '../../images/enter-app.png';
import fondImage from '../../images/background-image.png.jpg';
import etherLogo from '../../images/ether-logo.png';
import fromBuilders from '../../images/from-builders.png';


const Home = () => {

    return (
        <div className="Home">
            <div style={{backgroundImage:`url(${fondImage})`}}>
            </div>
            <div
                class="bg_image"
                style={{
                backgroundImage: 'url('+fondImage+')',
                backgroundSize: "cover",
                height: "100vh",
                color: "#f5f5f5"
                }}
            >
                <Link to="/supply-and-borrow">
                <div className="enter-app">
                    <img src={enterApp} width="170"/>
                </div>
            </Link>
            <div className="logo">
                <img src={logo} width="150"/>
            </div>
            <div className="text1">
                <h1>Intelligent Treasury Managment</h1>
            </div>
            <div className="text2">
            <h3>Automate your Treasury </h3>
            </div>
            <div className="from-builders">
                <img src={fromBuilders} width="270"/>
            </div>
            <div className="ether-logo">
                <img src={etherLogo} width="900"/>
            </div>
                <div className="cards">
                <Row xs={2} md={2} >
                    <Col>
                        <Card
                            bg="dark"
                            text="white"
                            style={{width:"30rem"}}
                            >
                            <Card.Body>
                                <Card.Text>Open Source Non-Custodial Ethereum based protocol</Card.Text>
                            </Card.Body>
                        </Card>   
                    </Col>
                    <Col>
                        <Card
                            bg="dark"
                            text="white"
                            style={{width:"30rem"}}
                        >
                            <Card.Body>
                                <Card.Text>Earn Interests and Make Payments with just a few Clicks</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                 </Row>
                </div>
            </div>
    </div>
    );
}



export default Home;