import React, { Component } from 'react';
import cookie from 'react-cookies'
import fire from '../Fire'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import "../css/navbar.css"
import logo from "../resources/mLogoV2-White.svg"

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gotoLogin: false
        }
    }
    logout = () => {
        cookie.remove('idToken', { path: "/" });
        cookie.remove('user', { path: "/" });
        fire.auth().signOut().then(() => {
            window.location.reload();
        });

    }
    
    render() {
        return (   
            <Navbar fixed = "top" className = "navbar" bg="dark"  variant = 'dark'>
            <img src={logo} alt="logo" className="navbar-logo"/>
            <Navbar.Brand href="/" >ercury</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className = "navBarItems">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/comingsoon">Calendar</Nav.Link>
                    <Nav.Link href="./workouts">Workouts</Nav.Link>
                    <Nav.Link href="./events">Events</Nav.Link>
                    <NavDropdown title = "Settings" id="navDropDown">
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
