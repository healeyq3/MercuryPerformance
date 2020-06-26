import React, { Component } from 'react'
import { Card } from 'react-bootstrap';

export class WorkoutDetailsCard extends Component {
    render() {
        return (
            <Card style = {{width: '25%', height: '25%'}}>
            <Card.Body>
                <Card.Title>WorkoutName</Card.Title>
                <Card.Subtitle>Location</Card.Subtitle>
                <p></p>
                <Card.Subtitle>Date</Card.Subtitle>
                <p></p>
        <Card.Subtitle>Distance  Unit</Card.Subtitle>
                <Card.Link href = './eventdetails' onClick={() => this.props.onSelect(this.props.workout)}>Edit</Card.Link>
            </Card.Body>
            </Card>
        )
    }
}

export default WorkoutDetailsCard
