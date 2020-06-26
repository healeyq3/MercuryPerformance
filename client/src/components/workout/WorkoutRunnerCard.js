import React, { Component } from 'react'
import { Card, Button, Row, Col, Accordion } from 'react-bootstrap';
import {timeGenerator} from '../../math/TimeConversions'

export class WorkoutRunnerCard extends Component {
    render() {
        let time = timeGenerator(this.props.time);
        return (
            <Accordion defaultActiveKey="0">
            <Card style = {{ height: '10%', orientation: 'horizontal'}}>
                <Card.Header>
                <Row>
                        <Col>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                         {<Card.Title>Name</Card.Title>}
                        </Accordion.Toggle>
                        
                        </Col>
                        <Col></Col>
                        <Col>
                        <Button variant = "outline-primary" onClick = {this.props.setShow}>Edit</Button>
                        <Button variant = "outline-secondary" onClick = {this.handleDelete}>🗑</Button>
                        </Col>
                    </Row>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>Data
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>
        )
    }
}

export default WorkoutRunnerCard
