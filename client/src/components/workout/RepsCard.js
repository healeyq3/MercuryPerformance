import React, { Component } from 'react';
import {Row, Col, Card, Button} from 'react-bootstrap';

export class RepsCard extends Component {
    render() {
        return (
            <Card>
                    <Row>
                        <Col>
                            <Card.Title>{this.props.rep.type}</Card.Title>
                        </Col>
                        <Col>
                            
                        </Col>
                        <Col>
                            {this.props.rep.hasOwnProperty('distance') === true ? <p>{this.props.rep.distance} {this.props.rep.distanceUnit}</p> : <p>{this.props.rep.hours}:{this.props.rep.minutes}:{this.props.rep.seconds}</p>}
                        </Col>
                        <Col>
                        <Col>
                            <p>{this.props.rep.percent}%</p>
                        </Col>
                        <Row>
                            <Button variant = "outline-primary">Edit</Button>
                            <Button variant = "outline-secondary">🗑</Button>
                            </Row>
                        </Col>
                    </Row>
                </Card>    
        )
    }
}

export default RepsCard
