import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { loginGoogle, selectCurrentUser } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "../../services/api";
import './Register.css';

const Signup = () => {
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordConfirmation, setPasswordConfirmation ] = useState('');
    const [ entityErrors, setEntityErrors ] = useState({});
    const user = useSelector(selectCurrentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) navigate('/dashboard');
    }, [user]);

    useEffect(() => {
        /* global google */
        google?.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: googleHandler,
        });

        google?.accounts.id.renderButton(
            document.getElementById('google-signin'),
            { theme: "outline", size: "large", width: 200 },
        )
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const user = { name, username, email, password, password_confirmation: passwordConfirmation };
            const response = await registerAPI(user);
            toast.success(response.data.message);
            navigate('/login');
        } catch (e) {
            if (e.response.data.code === 422) setEntityErrors(e.response.data.errors);
            if (e.response.data.code === 500) toast.error(e.response.data.message);
        }
    };

    const googleHandler = async (response) => {
        try {
            await dispatch(loginGoogle(response.credential)).unwrap()
                .then((data) => {
                    toast.success(data.message);
                    navigate('/dashboard');
                });
        } catch (e) {
            console.log(e);
            if (e.code === 400) setEntityErrors({ email: e.message });
            if (e.code === 500) toast.error(`${e.code} ${e.status}`);
        }
    };

    return (
        <Container>
            <Row>
                <Col md={7} className="d-flex flex-direction-column align-items-center justify-content-center">
                    <Form style={{ width: '80%', maxWidth: 500 }} autoComplete="off" onSubmit={submitHandler}>
                        <h1 className="text-center">Create an account</h1>

                        <Form.Group className="mb-4 mt-4" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"
                                          className={entityErrors.name ? 'is-invalid' : ''}
                                          name="name"
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
                                          placeholder="Enter name" />
                            { entityErrors.name && <div className="invalid-feedback">{entityErrors.name}</div> }
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"
                                          className={entityErrors.username ? 'is-invalid' : ''}
                                          name="username"
                                          value={username}
                                          onChange={(e) => setUsername(e.target.value)}
                                          placeholder="Enter username" />
                            { entityErrors.username && <div className="invalid-feedback">{entityErrors.username}</div> }
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"
                                          className={entityErrors.email ? 'is-invalid' : ''}
                                          name="email"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          placeholder="Enter email" />
                            { entityErrors.email && <div className="invalid-feedback">{entityErrors.email}</div> }
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          className={entityErrors.password ? 'is-invalid' : ''}
                                          name="password"
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                          placeholder="Password" />
                            { entityErrors.password && <div className="invalid-feedback">{entityErrors.password}</div> }
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPasswordConfirmation">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password"
                                          className={entityErrors.password_confirmation ? 'is-invalid' : ''}
                                          name="password_confirmation"
                                          value={passwordConfirmation}
                                          onChange={(e) => setPasswordConfirmation(e.target.value)}
                                          placeholder="Password Confirmation" />
                            { entityErrors.password_confirmation && <div className="invalid-feedback">{entityErrors.password_confirmation}</div> }
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Sign Up
                        </Button>

                        <div className="py-4">
                            <div className="text-center">
                                <small>
                                    Already have an account ? <Link to={'/login'} className="text-decoration-none">Login</Link>
                                </small>
                                <div className="my-3">
                                    <small>
                                        OR
                                    </small>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <div id="google-signin"></div>
                                </div>
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
