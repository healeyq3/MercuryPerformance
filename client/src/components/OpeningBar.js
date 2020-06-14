import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Navbar, Container } from 'react-bootstrap';

export class OpeningBar extends Component {
    render() {
        return (
            <Navbar className = "navBarNav" bg="dark"  variant = 'dark' expand="lg">
                <Container>
                <Navbar.Brand href="/login" >Mercury</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />  
                </Container>
            </Navbar>
        )
    }
}

export default withRouter(OpeningBar)
