import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mt-4 mb-4 rounded">
            <Container className="d-flex justify-content-between">
            <Nav>
                <Nav.Link as={NavLink} to="/">News Board</Nav.Link>
            </Nav>
            <Nav className="d-inline justify-content-end">
                <Nav.Link as={NavLink} to="/" className="d-inline m-3">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/about" className="d-inline" >About</Nav.Link>
            </Nav>
        </Container>
        </Navbar>
    );
};

export default NavBar;