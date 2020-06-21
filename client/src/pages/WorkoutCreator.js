import React, { Component } from 'react'
import { Row, Card, Col, Form, Button} from 'react-bootstrap'
import WarmupPopover from '../components/workout/WarmupPopover'

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
                            
                            <Form.Group>
                                <Form.Label>Add Rep</Form.Label>
                                <Form.Control onChange = {this.handleChange} name = "name" type = "text" placeholder = "Enter Workout Name"/>
                                <Button>Add</Button>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Add Cooldown</Form.Label>
                                <Form.Control onChange = {this.handleChange} name = "name" type = "text" placeholder = "Enter Workout Name"/>
                                <Button>Add</Button>
                            </Form.Group>
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
