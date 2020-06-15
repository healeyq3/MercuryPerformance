import React, { Component } from 'react'
import {Row, Col, Card} from 'react-bootstrap'

export class ExistingWorkoutCard extends Component {
    render() {
        return (
            <Card tag="a" onClick style = {{cursor:"pointer"}}>
                    <Row>
                    <Col>
                    <Card.Title>Workout Name</Card.Title>
                    </Col>
                    <Col>
                    <p>Date</p>
                    </Col>
                    <Col>
                    <p>Time</p>
                    </Col>
                    </Row>
                </Card>
        )
    }
}

export default ExistingWorkoutCard
