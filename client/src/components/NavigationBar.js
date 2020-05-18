import React, { Component } from 'react';
import cookie from 'react-cookies'
import fire from '../Fire'

//Bootstrap
import { Container } from 'react-bootstrap';
import { Navbar, Nav, Button } from 'react-bootstrap';

class NavigationBar extends Component {
    
    logout = () => {
        cookie.remove('idToken', { path: "/" });
        cookie.remove('user', { path: "/" });
        fire.auth().signOut().then();
    }
    
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
                        <Button type = "submit" onClick = {this.logout}>Logout</Button>
                        </Navbar.Collapse>
                    </Navbar> 
                </header>
            </Container>
        )
    }
}

export default NavigationBar;
