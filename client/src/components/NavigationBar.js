import React, { Component } from 'react';

//Bootstrap
import { Container } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';

class NavigationBar extends Component {
    render() {
        return (
            <Container fluid>
                <header className = "navBar">
                    <Navbar className = "navBarNav" bg="light" expand="lg">
                    <Navbar.Brand href="/Home" >Mercury</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className = "navBarItems">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/CalendarHome">Calendar</Nav.Link>
                        <Nav.Link href="./WorkoutInventory">Workouts</Nav.Link>
                        <Nav.Link href="/teamselect">Select Team</Nav.Link>
                        <Nav.Link href="/Settings">Settings</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">Create Account</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Navbar> 
                </header>
            </Container>
        )
    }
}

export default NavigationBar;
