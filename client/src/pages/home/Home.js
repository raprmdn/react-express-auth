import React from 'react';
import {Row, Col, Button, Container} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import './Home.css';

const Home = () => {
    return (
        <Container>
            <Row>
                <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center">
                    <div>
                        <h1>JWT and OAuth2 Authentication</h1>
                        <p>Lets Explore</p>
                        <LinkContainer to={'/login'}>
                            <Button variant="success">Get Started
                                <i className="fa-solid fa-right-to-bracket mx-2"></i>
                            </Button>
                        </LinkContainer>
                    </div>
                </Col>
                <Col md={6} className="home__bg"></Col>
            </Row>
        </Container>
    );
};

export default Home;
