import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import css from './MainHome.css';

const MainHomeCards = (props) => {
    return (

      <div className="MainHomeCards">
        <Row xs={2}>
            <Col>
            <Link to="home">
            <Card
            bg="black"
            border="info"
            text="white"
            >
                <Card.Header as="h4">{props.title1}</Card.Header>
                <Card.Body>
                <Card.Text as="h5">
                    {props.text1}
                </Card.Text><br/>
                
                </Card.Body>
                <Button 
                    variant="success"
                    onClick={props.onClick}
                >
                   Already Have a Safe
                </Button>
             </Card>
             </Link>
            </Col>
            <Col>
            <Card
            bg="black"
            border="info"
            text="white"
            >
                <Card.Header as="h4">{props.title1}</Card.Header>
                <Card.Body>
                <Card.Text as="h5">
                    {props.text2}
                </Card.Text><br/>
                
                </Card.Body>
                <Button 
                    variant="info"
                    onClick={props.onClick2}
                >
                   Create Safe
                </Button>
             </Card>
            </Col>
        </Row>
    </div>
    );
  }
  

export default MainHomeCards;