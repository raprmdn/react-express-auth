import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Register.css';

const Signup = () => {
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordConfirmation, setPasswordConfirmation ] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(name, username, email, password, passwordConfirmation);
    }

    return (
        <Container>
            <Row>
                <Col md={7} className="d-flex flex-direction-column align-items-center justify-content-center">
                    <Form style={{ width: '80%', maxWidth: 500 }} autoComplete="off" onSubmit={submitHandler}>
                        <h1 className="text-center">Create an account</h1>

                        <Form.Group className="mb-4 mt-4" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"
                                          name="name"
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
                                          placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"
                                          name="username"
                                          value={username}
                                          onChange={(e) => setUsername(e.target.value)}
                                          placeholder="Enter username" />
                        </Form.Group>
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
                        <Form.Group className="mb-4" controlId="formBasicPasswordConfirmation">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password"
                                          name="password_confirmation"
                                          value={passwordConfirmation}
                                          onChange={(e) => setPasswordConfirmation(e.target.value)}
                                          placeholder="Password Confirmation" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Sign Up
                        </Button>

                        <div className="py-4">
                            <div className="text-center">
                                <small>
                                    Already have an account ? <Link to={'/login'} className="text-decoration-none">Login</Link>
                                </small>
                            </div>
                        </div>
                    </Form>
                </Col>
                <Col md={5} className="signup__bg"></Col>
            </Row>
        </Container>
    );
};

export default Signup;
