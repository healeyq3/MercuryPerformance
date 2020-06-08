import React, { Component } from 'react'
import { Card } from 'react-bootstrap';

export class EventDetailsCard extends Component {
    render() {
        return (
            <Card style = {{width: '25%', height: '25%'}}>
            <Card.Body>
                <Card.Title>Event Name</Card.Title>
                <Card.Subtitle>Hometown, USA</Card.Subtitle>
                <p></p>
                <Card.Subtitle>12/12/20</Card.Subtitle>
                <p>
                </p>
                <Card.Subtitle>5 Kilometers</Card.Subtitle>
                <Card.Link href = './eventdetails' onClick={() => this.props.onSelect(this.props.event)}>Edit</Card.Link>
            </Card.Body>
            </Card>
        )
    }
}

export default EventDetailsCard
