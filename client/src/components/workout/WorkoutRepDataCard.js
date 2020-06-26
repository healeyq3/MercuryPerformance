import React, { Component } from 'react'
import { Card, Row, Col } from 'react-bootstrap';

export class WorkoutRepDataCard extends Component {
    render() {
        return (
            <Card style = {{ height: '10%', orientation: 'horizontal'}}>
                <Card.Body>
                    <Row>
                        <Col>
                        <Card.Title>{this.props.rep.type}</Card.Title>
                        </Col>
                            <p>{this.props.rep.percent}</p>
                        <Col>
                        </Col>
                    </Row>
                    
                </Card.Body>
            </Card>
        )
    }
}

export default WorkoutRepDataCard
