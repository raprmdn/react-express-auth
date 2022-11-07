import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, selectCurrentUser, loginGoogle } from "../../features/authSlice";
import toast from "react-hot-toast";
import './Login.css';
import { Link } from "react-router-dom";

const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ entityErrors, setEntityErrors ] = useState({});
    const { isLoading } = useSelector(state => state.auth);
    const user = useSelector(selectCurrentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            const user = { email, password };
            await dispatch(login(user)).unwrap()
                .then((data) => {
                    toast.success(data.message);
                    navigate('/dashboard');
                });
        } catch (e) {
            if (e.code === 422) setEntityErrors(e.errors);
            if (e.code === 400) setEntityErrors({ email: e.message });
            if (e.code === 500) toast.error(`${e.code} ${e.status}`);
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
                <Col md={5} className="login__bg"></Col>
                <Col md={7} className="d-flex flex-direction-column align-items-center justify-content-center">
                    <Form style={{ width: '80%', maxWidth: 500 }} autoComplete="off" onSubmit={submitHandler}>

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

                        <Button variant="primary" type="submit" id="login-btn" disabled={isLoading}>
                            Login
                        </Button>

                        <div className="py-4">
                            <div className="text-center">
                                <small>
                                    Doesn't have an account ? <Link to={'/register'} className="text-decoration-none">Sign Up</Link>
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
            </Row>
        </Container>
    );
};

export default Login;
