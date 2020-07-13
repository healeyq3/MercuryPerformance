import React, { Component } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap';

export class ExistingRunnerCard extends Component {
    render() {
        return (
            <Card style = {{width: '100%', height: '10%', cursor: "pointer"}} tag="a" onClick = {() => this.props.onSelect(this.props.runner)}>
                <Card.Body>
                    <Row>
                        <Col>
                    <Card.Title>{this.props.runner.name}</Card.Title>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                    <p>{this.props.runner.wPace}</p>
                    </Col>
                    <Col>
                    <p>{this.props.runner.experience}</p>
                    </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}

export default ExistingRunnerCard;