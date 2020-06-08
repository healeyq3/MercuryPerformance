import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';

export class EventRunnerCard extends Component {
    render() {
        return (
            <Card style = {{width: '65%', height: '10%', orientation: 'horizontal'}}>
                <Card.Body>
                    <Card.Title>Runner Name</Card.Title>
                    <Card.Subtitle>00:00</Card.Subtitle>
                    <Button variant = "outline-primary" onClick = {this.handleEdit}>Edit</Button>
                    <Button variant = "outline-primary" onClick = {this.handleDelete}>Delete</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default EventRunnerCard
