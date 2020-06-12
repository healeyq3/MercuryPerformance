import React, { Component } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap';

export class EventRunnerCard extends Component {
    render() {
        return (
            <Card style = {{width: '65%', height: '10%', orientation: 'horizontal'}}>
                <Card.Body>
                    <Row>
                        <Col>
                        <Card.Title>{this.props.runner.name}</Card.Title>
                        <Card.Subtitle>{this.props.runner.finalTime}</Card.Subtitle>
                        </Col>
                        <Col></Col>
                        <Col>
                        <Button variant = "outline-primary" onClick = {this.handleEdit}>Edit</Button>
                        <Button variant = "outline-primary" onClick = {this.handleDelete}>Delete</Button>
                        </Col>
                    </Row>
                    
                </Card.Body>
            </Card>
        )
    }
}

export default EventRunnerCard
