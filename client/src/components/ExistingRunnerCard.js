import React, { Component } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap';

export class ExistingRunnerCard extends Component {
    render() {
        return (
            <Card style = {{width: '100%', height: '10%'}}>
                <Card.Body>
                    <Row>
                        <Col>
                    <Card.Title>{this.props.runner.name}</Card.Title>
                    </Col>
                    <Col>
                    <p>School Year</p>
                    </Col>
                    <Col>
                    <p>V02Max</p>
                    </Col>
                    <Col>
                    <p>Experience</p>
                    </Col>
                    <Button variant = "outline-primary">Edit</Button>
                    <Button variant = "outline-secondary">🗑</Button>
                    </Row>
                    <Card.Link href = './events' onClick = {() => this.props.onSelect(this.props.runner)}> Select Runner </Card.Link>
                </Card.Body>
            </Card>
        )
    }
}

export default ExistingRunnerCard;