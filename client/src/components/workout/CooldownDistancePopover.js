import React, { Component } from "react";
import {
  Popover,
  Overlay,
  Button,
  Form,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { connect } from "react-redux";
import ReactDOM from "react-dom";

export class CooldownDistancePopover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "distance cooldown",
      percent: 0,
      distance: 0,
      distanceUnit: "",
      show: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleCreateCooldown = () => {
    const repData = {
      type: this.state.type,
      percent: this.state.percent,
      distance: this.state.distance,
      distanceUnit: this.state.distanceUnit,
    };
    let toAddArr = []
    toAddArr.push(repData)
    this.props.addArr(toAddArr);
    this.setState({ show: !this.state.show });
  };

  reset = () => {
    console.log("Reset called");
    this.setState({
      type: "distance cooldown",
      percent: 0,
      distance: 0,
      distanceUnit: "",
    });
  };

  render() {
    return (
      <Container fluid>
        <Button
          onClick={() => this.setState({ show: !this.state.show })}
          ref={(button) => {
            this.target = button;
          }}
        >
          Distance
        </Button>
        <Overlay
          show={this.state.show}
          onEnter={this.reset}
          target={ReactDOM.findDOMNode(this.target)}
          placement="right"
        >
          <Popover id="popover-basic" className="text-center">
            <Popover.Title as="h3">Add Cooldown</Popover.Title>
            <Popover.Content>
              <Form>
                <Form.Control
                  type="text"
                  placeholder="% of V02 Max"
                  name="percent"
                  onChange={this.handleChange}
                />
                <Form.Control
                  type="text"
                  placeholder="Distance"
                  name="distance"
                  onChange={this.handleChange}
                />

                <Form.Control
                  onChange={this.handleChange}
                  name="distanceUnit"
                  as="select"
                >
                  <option hidden>Units</option>
                  <option>Miles</option>
                  <option>Kilometers</option>
                  <option>Meters</option>
                </Form.Control>
                <Row>
                  <Col>
                    <Button
                      variant="outline-secondary"
                      onClick={() => this.setState({ show: !this.state.show })}
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      onClick={this.handleCreateCooldown}
                    >
                      Add
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Popover.Content>
          </Popover>
        </Overlay>
      </Container>
    );
  }
}

export default connect(null, {})(CooldownDistancePopover);
