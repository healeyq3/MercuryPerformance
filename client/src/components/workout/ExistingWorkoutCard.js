import React, { Component } from 'react'
import {Row, Col, Card, Button} from 'react-bootstrap'

export class ExistingWorkoutCard extends Component {
    render() {
        return (
            <Card tag="a" onClick={() => this.props.onSelect(null)} style = {{cursor:"pointer"}}>
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
                    <Col>
                    <Row>
                    <Button variant = "outline-primary">Edit</Button>
                    <Button variant = "outline-secondary">🗑</Button>
                    </Row>
                    </Col>
                    </Row>
                </Card>
        )
    }
}

export default ExistingWorkoutCard
