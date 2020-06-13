import React, { Component } from 'react'
//Bootstrap
import { Container } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

export class EventNavBar extends Component {
    render() {
        return (
            <Container fluid>
                {/* <header className = "navBar">
                    <Navbar className = "navBarNav" bg="light" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav"> */}
                        <Nav fill variant="tabs" className="justify-content-center">
                            <Nav.Item> 
                                <Nav.Link onClick = {this.props.setShowRunner}>Add Runners</Nav.Link>
                            </Nav.Item>
                            <Nav.Item> 
                                <Nav.Link onClick = {this.props.setShowResults}>Add Results</Nav.Link>
                            </Nav.Item>
                            <Nav.Item> 
                                <Nav.Link href="./comingsoon">Analysis</Nav.Link>
                            </Nav.Item>
                            <Nav.Item> 
                                <Nav.Link href="./comingsoon">Edit</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        {/* </Navbar.Collapse>
                    </Navbar> 
                </header> */}
            </Container>
        )
    }
}

export default withRouter(EventNavBar)
