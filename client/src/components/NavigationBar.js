import React, { Component } from 'react';
import cookie from 'react-cookies'
import fire from '../Fire'

//Bootstrap
import { Navbar, Nav, Button } from 'react-bootstrap';
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
                <header className = "navBar">
                    <Navbar className = "navBarNav" bg="dark"  variant = 'dark' expand="lg">
                    <Navbar.Brand href="/" >Mercury</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className = "navBarItems">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/comingsoon">Calendar</Nav.Link>
                        <Nav.Link href="./workouts">Workouts</Nav.Link>
                        <Nav.Link href="./events">Events</Nav.Link>
                        <Nav.Link href="/teamselect">Select Team</Nav.Link>
                        <Nav.Link href="/comingsoon">Settings</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">Create Account</Nav.Link>
                        </Nav>
                        <Button type = "submit" variant = 'outline-primary' onClick = {this.logout}>Logout</Button>
                        </Navbar.Collapse>
                    </Navbar> 
                </header>
        )
    }
}

export default withRouter(NavigationBar);
