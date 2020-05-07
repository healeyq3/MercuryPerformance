import React from 'react'
import './Navbar.css'
import { Container } from 'react-bootstrap';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
const navbar = props => (
    <Container fluid>
    <header className = "navBar">
    <Navbar className = "navBarNav" bg="light" expand="lg">
    <Navbar.Brand href="/Home" >Mercury</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className = "navBarItems">
        <Nav.Link href="/Home">Home</Nav.Link>
        <Nav.Link href="/">Calendar</Nav.Link>
        <Nav.Link href="/">Workouts</Nav.Link>
        <Nav.Link href="/">Settings</Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Navbar> 
    
        </header>
        </Container>
);export default navbar;