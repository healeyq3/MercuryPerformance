import React, { Component } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap';
import {timeGenerator} from '../../math/TimeConversions'

export class EventRunnerCard extends Component {
    render() {
        if(!this.props.runner){
            return;
        }
        let time  = timeGenerator(this.props.time)
        return (
          <Card style = {{ height: '10%', orientation: 'horizontal'}}>
              <Card.Body>
                  <Row>
                      <Col>
                          <Card.Title>{this.props.runner.name}</Card.Title>
                      </Col>
                      <p>{time}</p>
                      <Col/>
                      <Col>
                          <Button variant = "outline-primary" onClick = {this.props.setShow}>Edit</Button>
                          <Button variant = "outline-secondary" onClick = {this.handleDelete}>🗑</Button>
                      </Col>
                  </Row>

              </Card.Body>
          </Card>
        )
    }
}

export default EventRunnerCard
