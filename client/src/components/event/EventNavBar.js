import React, { Component } from 'react'
//Bootstrap
import { Container } from 'react-bootstrap';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

export class EventNavBar extends Component {
    render() {
        return (
            <Container fluid>
                <header className = "navBar">
                    <Navbar className = "navBarNav" bg="light" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className = "navBarItems">
                        <Button variant = "outline-primary" onClick = {this.props.setShowRunner}>Add Runners</Button>
                        <Button variant = "outline-primary" onClick = {this.props.setShowResults}>Add Results</Button>
                        <Nav.Link href="./comingsoon">Analysis</Nav.Link>
                        <Nav.Link href="./comingsoon">Edit</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Navbar> 
                </header>
            </Container>
        )
    }
}

export default withRouter(EventNavBar)
