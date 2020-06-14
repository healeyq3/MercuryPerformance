import React, { Component } from '../../../node_modules/react'
import { Card, Row, Col } from '../../../node_modules/react-bootstrap';

export class ExistingEventCard extends Component {
    render() {
        return (
            <Card style = {{width: '100%', height: '10%', cursor: "pointer"}} tag="a" onClick={() => this.props.onSelect(this.props.event)}>
                <Card.Body>
                    <Row>
                       <Col>
                            <p>{this.props.event.date}</p>
                        </Col> 
                        <Col>
                            <Card.Title>{this.props.event.name}</Card.Title>
                        </Col>
                        <Col>
                        <p>{this.props.event.location}</p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}

export default ExistingEventCard
