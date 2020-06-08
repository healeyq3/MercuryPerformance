import React, { Component } from 'react'
import { Card } from 'react-bootstrap';

export class ExistingEventCard extends Component {
    render() {
        return (
            <Card style = {{width: '100%', height: '10%'}}>
                <Card.Body>
                    <Card.Title>{this.props.event.name}</Card.Title>
                    <Card.Subtitle>{this.props.event.location}</Card.Subtitle>
                    <p></p>
                    <Card.Subtitle>{this.props.event.date}</Card.Subtitle>
                    <Card.Link href = './eventdetails' onClick={() => this.props.onSelect(this.props.event)}>Select Event</Card.Link>
                </Card.Body>
            </Card>
        )
    }
}

export default ExistingEventCard
