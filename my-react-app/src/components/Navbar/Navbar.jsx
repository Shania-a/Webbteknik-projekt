import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Buttons from '../Buttons/Buttons.jsx';

function NavbarTest({ handlePreviousDay }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Spacefullness</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Buttons as={NavLink} to="/" text="Daily Image"></Buttons>
            <Buttons 
            as={NavLink} 
            to="/previous" 
            text="Previous"
            onClick={() => handlePreviousDay && handlePreviousDay(location.pathname)}
            ></Buttons>
            <Buttons as={NavLink} to="/archive" text="Archive"></Buttons>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarTest;