import React, { Component } from 'react'
//Bootstrap
import { Container } from 'react-bootstrap';
import {  Nav } from 'react-bootstrap';

export class WorkoutNavBar extends Component {
    render() {
        return (
            <Container fluid>
                        <Nav fill variant="tabs" className="justify-content-center">
                            <Nav.Item> 
                                <Nav.Link onClick = {this.props.setShowRunner}>Add Runners</Nav.Link>
                            </Nav.Item>
                            <Nav.Item> 
                                <Nav.Link href = "./comingsoon">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item> 
                                <Nav.Link href="./comingsoon">Analysis</Nav.Link>
                            </Nav.Item>
                            <Nav.Item> 
                                <Nav.Link href="./comingsoon">Edit</Nav.Link>
                            </Nav.Item>
                        </Nav>
            </Container>
        )
    }
}

export default WorkoutNavBar
