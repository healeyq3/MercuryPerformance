import React, { Component } from 'react';
import cookie from 'react-cookies'
import fire from '../Fire'

//Bootstrap
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

class NavigationBar extends Component {
    logout = () => {
        cookie.remove('idToken', { path: "/" });
        cookie.remove('user', { path: "/" });
        fire.auth().signOut().then(() => {
            this.props.history.push('/');
            window.location.reload();
        });

    }
    
    render() {
        return (   
            <Navbar className = "navBarNav" bg="dark"  variant = 'dark' expand="lg">
            <Navbar.Brand href="/" >Mercury</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className = "navBarItems">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/comingsoon">Calendar</Nav.Link>
                    <Nav.Link href="./workouts">Workouts</Nav.Link>
                    <Nav.Link href="./events">Events</Nav.Link>
                    <NavDropdown title = "Settings">
                        <NavDropdown.Item href="/teamselect">Select Team</NavDropdown.Item>
                        <NavDropdown.Item href="/comingsoon">Settings</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Navbar> 
        )
    }
}

export default withRouter(NavigationBar);
