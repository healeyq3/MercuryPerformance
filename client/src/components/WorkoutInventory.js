import React, { Component } from 'react'
import { Container, ListGroup } from 'react-bootstrap';
import NavBar from './NavBar';

export class WorkoutInventory extends Component {
    render() {
        return (
            <Container fluid>
                <NavBar />
                <ListGroup>
                  
                </ListGroup>
            </Container>
        )
    }
}

export default WorkoutInventory
