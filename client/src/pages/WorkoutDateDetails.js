import React, { Component } from 'react'
import { Col, Row, Card, Form } from 'react-bootstrap'
import WorkoutDateRunnerCard from '../components/workout/WorkoutDateRunnerCard'

export class WorkoutDateDetails extends Component {
    render() {
        
        return (
            <Row>
            <Col>
                <Card className = "text-center">
                    <Card.Header>Going</Card.Header>
                    <Card.Body>
                        <WorkoutDateRunnerCard></WorkoutDateRunnerCard>
                        <WorkoutDateRunnerCard></WorkoutDateRunnerCard>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className = "text-center">
                    <Card.Header>Not Going</Card.Header>
                    <Card.Body>
                        <WorkoutDateRunnerCard></WorkoutDateRunnerCard>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className = "text-center">
                    <Card.Header>Notes</Card.Header>
                    <Form>
                      <Form.Control as ="textarea">
                      </Form.Control>
                    </Form>
                </Card>
            </Col>
            </Row>
        )
    }
}

export default WorkoutDateDetails
