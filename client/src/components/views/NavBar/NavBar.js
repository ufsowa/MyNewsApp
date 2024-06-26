import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { getLoggedUser } from '../../../Redux/usersReducer';


const NavBar = () => {
    const loggedUser = useSelector(getLoggedUser)

    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mt-4 mb-4 rounded">
            <Container className="justify-content-between">
                <Navbar.Brand>
                    <Nav.Link as={NavLink} to="/">News Board</Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="">
                    <Nav.Link as={NavLink} to="/" className="d-inline">Home</Nav.Link>
                    { !loggedUser && <Nav.Link as={NavLink} to="/login" className="d-inline" >Sign In</Nav.Link>}
                    { loggedUser && <Nav.Link as={NavLink} to="/logout" className="d-inline" >Sign Out</Nav.Link>}
                    { !loggedUser && <Nav.Link as={NavLink} to="/register" className="d-inline" >Register</Nav.Link>}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;