import React, { Component } from 'react'
import { Container, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
