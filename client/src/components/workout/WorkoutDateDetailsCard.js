import React, { Component } from 'react'
import { Card } from 'react-bootstrap';

export class WorkoutDetailsCard extends Component {
    render() {

        return (
            <Card style = {{width: '40%', height: '20%'}}>
            <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
                <p></p>
                <Card.Subtitle>{this.props.date}</Card.Subtitle>
                <p></p>
                <Card.Link href = './eventdetails' onClick={() => this.props.onSelect(this.props.workout)}>Edit</Card.Link>
            </Card.Body>
            </Card>
        )
    }
}

export default WorkoutDetailsCard
