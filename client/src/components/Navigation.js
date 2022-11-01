import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, reset } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navigation = () => {
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(reset());
        toast.success('Logout successfully');
        navigate('/login');
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        Login App
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {
                            !user && (
                                <LinkContainer to={'/login'}>
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
                            )
                        }
                        {
                            user && (
                                <NavDropdown title={user.name} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
