import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Buttons from '../../Buttons/Buttons';

function NavbarTest() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Spacefullness</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Dagens Bild</Nav.Link>
            <Nav.Link as={NavLink} to="/arkiv">Arkiv</Nav.Link>
            <Buttons text="Home"></Buttons>
            <Buttons text="Previous"></Buttons>
            <Buttons text="Archive"></Buttons>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarTest;