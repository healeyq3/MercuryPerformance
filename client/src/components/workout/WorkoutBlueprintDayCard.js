import React, { Component } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'

export class WorkoutBlueprintDayCard extends Component {
    render() {
        return (
            <Card style = {{ height: '10%', orientation: 'horizontal', cursor:'pointer'}} tag="a" onClick={() => this.props.onSelect(this.props.workout)}>
                <Card.Body>
                    <Row>
                        <Col>
                        <Card.Title>Date: {this.props.workout.date}</Card.Title>
                        </Col>
                        <Button variant = "outline-secondary" onClick = {this.handleDelete}>🗑</Button>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}

export default WorkoutBlueprintDayCard
