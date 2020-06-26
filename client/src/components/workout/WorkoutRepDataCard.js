import React, { Component } from 'react'
import { Card, Row, Col } from 'react-bootstrap';

export class WorkoutRepDataCard extends Component {
    render() {
        return (
            <Card style = {{ height: '10%', orientation: 'horizontal'}}>
                <Card.Body>
                    <Row>
                        <Col>
                        <Card.Title>Rep Name</Card.Title>
                        </Col>
                        <p>Rep Time</p>
                        <Col>
                        </Col>
                    </Row>
                    
                </Card.Body>
            </Card>
        )
    }
}

export default WorkoutRepDataCard
