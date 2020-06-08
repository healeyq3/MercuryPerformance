import React, { Component } from 'react'
import { Card, button } from 'react-bootstrap';

export class EventRunnerCard extends Component {
    render() {
        return (
            <Card style = {{width: '65%', height: '10%', orientation: 'horizontal'}}>
                <Card.Body>
                    <Card.Title>Runner Name</Card.Title>
                    <Card.Subtitle>00:00</Card.Subtitle>
                    <button class="btn btn-sm btn-outline-secondary" type="button" onClick = {this.handleEdit}>Edit</button>
                    <button class="btn btn-sm btn-outline-secondary" type="button" onClick = {this.handleDelete}>Delete</button>
                </Card.Body>
            </Card>
        )
    }
}

export default EventRunnerCard
