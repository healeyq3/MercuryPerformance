import React, { Component } from 'react'
import { Card } from 'react-bootstrap';

export class ExistingEventCard extends Component {
    render() {
        return (
            <Card style = {{width: '100%', height: '10%'}}>
                <Card.Body>
                    <Card.Title>Event</Card.Title>
                    <Card.Subtitle>Event Details</Card.Subtitle>
                </Card.Body>
            </Card>
        )
    }
}

export default ExistingEventCard
