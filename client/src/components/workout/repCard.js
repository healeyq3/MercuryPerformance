import React, { Component } from 'react'
import {Row, Col, Card, Button} from 'react-bootstrap'

export class RepCard extends Component {
    render() {
        return (
            <Card >
                    <Row>
                        <Col>
                            <Card.Title>{this.props.rep.type}</Card.Title>
                        </Col>
                        <Col>
                            
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Card>
        )
    }
}

export default RepCard
