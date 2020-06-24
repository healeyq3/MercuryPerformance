import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Navbar } from 'react-bootstrap';

export class OpeningBar extends Component {
    render() {
        return (
            <Navbar className = "navBarNav" bg="dark"  variant = 'dark' expand="lg">
                <Navbar.Brand href="/login" >Mercury</Navbar.Brand>
            </Navbar>
        )
    }
}

export default withRouter(OpeningBar)
