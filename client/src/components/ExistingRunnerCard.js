import React, { Component } from 'react'
import { Card } from 'react-bootstrap';

export class ExistingRunnerCard extends Component {
    render() {
        return (
            <Card style = {{width: '100%', height: '10%'}}>
                <Card.Body>
                    <Card.Title>{this.props.runner.name}</Card.Title>
                    <Card.Subtitle>Extra details</Card.Subtitle>
                </Card.Body>
            </Card>
        )
    }
}

export default ExistingRunnerCard;