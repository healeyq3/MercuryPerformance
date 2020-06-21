import React, { Component } from 'react'
import { Card, Row, Col, Form } from 'react-bootstrap'

export class WorkoutDateRunnerCard extends Component {
    render() {
        return (
            <Card style = {{ height: '10%', orientation: 'horizontal'}}>
                <Card.Body>
                    <Row>
                        <Col>
                        <Card.Title>Runner Name</Card.Title>
                        </Col>
                        
                        <Col><p></p></Col>
                        <Col></Col>
                        <Col>
                        <p></p>
                        <Form>
                            <Form.Group controlId="formBasicCheckbox">
                                <Row>
                                <Form.Check type="checkbox" />
                                <Form.Check type="checkbox" style = {{ }}/>
                                </Row>
                            </Form.Group>
                        </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}

export default WorkoutDateRunnerCard
