import React, { Component } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'

export class WorkoutBlueprintDayCard extends Component {
    render() {
        return (
            <Card style = {{ height: '10%', orientation: 'horizontal'}}>
                <Card.Body>
                    <Row>
                        <Col>
                        <Card.Title>Date</Card.Title>
                        </Col>
                        <Col>
                        <p>Details</p>
                        </Col>
                        <Button variant = "outline-primary" onClick = {this.props.setShow}>Edit</Button>
                        <Button variant = "outline-secondary" onClick = {this.handleDelete}>🗑</Button>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}

export default WorkoutBlueprintDayCard
