import React, { Component } from 'react'
import { Card } from 'react-bootstrap';

export class EventDetailsCard extends Component {
    render() {
        return (
            <Card style = {{width: '25%', height: '25%'}}>
            <Card.Body>
                <Card.Title>{this.props.event.name}</Card.Title>
                <Card.Subtitle>{this.props.event.location}</Card.Subtitle>
                <p></p>
                <Card.Subtitle>{this.props.event.date}</Card.Subtitle>
                <p></p>
        <Card.Subtitle>{this.props.event.distance}  {this.props.event.distanceUnit}</Card.Subtitle>
                <Card.Link href = './eventdetails' onClick={() => this.props.onSelect(this.props.event)}>Edit</Card.Link>
            </Card.Body>
            </Card>
        )
    }
}

export default EventDetailsCard
