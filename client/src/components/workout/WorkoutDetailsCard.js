import React, { Component } from 'react'
import {Row, Col, Card} from 'react-bootstrap'

export class WorkoutDetailsCard extends Component {
    render() {
        return (
            <Card>
                        <Card.Header className = "text-center">Workout Details</Card.Header>
                        <Row>
                            <Col>
                        <Card className = "text-center">
                            <Card.Title>Part 1</Card.Title>
                            <Card.Subtitle>11 minutes</Card.Subtitle>
                        </Card>
                        </Col>
                        <Col>
                        <Card className = "text-center">
                            <Card.Title>Part 2</Card.Title>
                            <Card.Subtitle>12 minutes</Card.Subtitle>
                        </Card>
                        </Col>
                        </Row>
                    </Card>
        )
    }
}

export default WorkoutDetailsCard
