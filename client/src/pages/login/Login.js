import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import './Login.css';
import { Link } from "react-router-dom";

const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <Container>
            <Row>
                <Col md={5} className="login__bg"></Col>
                <Col md={7} className="d-flex flex-direction-column align-items-center justify-content-center">
                    <Form style={{ width: '80%', maxWidth: 500 }} autoComplete="off" onSubmit={submitHandler}>

                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"
                                          name="email"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          name="password"
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                          placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>

                        <div className="py-4">
                            <div className="text-center">
                                <small>
                                    Doesn't have an account ? <Link to={'/register'} className="text-decoration-none">Sign Up</Link>
                                </small>
                            </div>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
