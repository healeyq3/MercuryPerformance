import React, { Component } from 'react'
import { Row, Card, Col, Form } from 'react-bootstrap'
import WarmupPopover from '../components/workout/WarmupPopover'
import { CooldownPopover } from '../components/workout/CooldownPopover'
import RepPopover from '../components/workout/RepPopover'

export class WorkoutCreator extends Component {
    render() {
        return (
            <Row>
                <Col>
                    <Card className= "text-center">
                        <Card.Header>New Workout</Card.Header>
                        <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Workout Name</Form.Label>
                                <Form.Control onChange = {this.handleChange} name = "name" type = "text" placeholder = "Enter Workout Name"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Add Warmup</Form.Label>
                                </Form.Group>
                                <WarmupPopover></WarmupPopover>
                            <p></p>
                            <Form.Group>
                                <Form.Label>Add Rep</Form.Label>
                            </Form.Group>
                            <RepPopover></RepPopover>
                            <p></p>
                            <Form.Group>
                                <Form.Label>Add Cooldown</Form.Label>
                            </Form.Group>
                            <CooldownPopover></CooldownPopover>
                        </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
                <Col></Col>
            </Row>
        )
    }
}

export default WorkoutCreator
