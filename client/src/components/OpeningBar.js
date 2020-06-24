import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import '../css/navbar.css';
import Nav from "react-bootstrap/Nav";

export class OpeningBar extends Component {
    render() {
        return (
            <Navbar className = "navbar-opening" variant = 'dark' expand="lg">
                <Navbar.Brand href="/login" >Mercury</Navbar.Brand>
            </Navbar>
        )
    }
}

export default withRouter(OpeningBar)
