import React, { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";
import '../css/home.css'

export class ExistingRunnerCard extends Component {
  render() {
    return (
      <Card
        className = {"runner-card-" + this.props.color}
        tag="a"
        onClick={() => this.props.onSelect(this.props.runner)}
      >
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>{this.props.runner.name}</Card.Title>
            </Col>
            <Col></Col>
            <Col>
              <p>{this.props.runner.wPace}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default ExistingRunnerCard;
