import React from "react";
import { connect } from "react-redux";
import { Container, Button, Form, Modal } from "react-bootstrap";
import { newRunner } from "../actions/runnerActions";
import AddRunnerV02 from "./AddRunnerV02";
import { getWorkoutPace, getV02max } from "../math/V02max";
import '../css/home.css';
import { getCleanDate } from '../math/DateAlgos';

export class AddRunner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      show: false,
      name: "",
      email: "",
      experience: "",
      gradYear: "",
      workoutPace: "",
      initialDistance: 0.0,
      distanceUnit: "",
      initialHours: 0,
      initalMinutes: 0,
      initialSeconds: 0,
      v02max: 0,
    };

    this.baseState = this.state; //doesn't work because the show stuff is in here
    this.handleChange = this.handleChange.bind(this);
    // this.handleAddRunner = this.handleAddRunner.bind(this);
  }

  showModal = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAddRunner = () => {
    const d1 = new Date();
    console.log(d1);
    const d2 = getCleanDate(d1);
    console.log(d2);
    const runnerData = {
      runnerName: this.state.name,
      runnerEmail: this.state.email,
      runnerExperience: this.state.experience,
      runnerGradYear: this.state.gradYear,
      runnerWorkoutPace: this.state.workoutPace,
      runnerV02Max: this.state.v02max,
      dateAdded: d2
    };
    console.log(runnerData);
    this.props.newRunner(runnerData, this.props.teamUID);
    this.showModal();
  };

  handleCalculate = () => {
    const data = {
      distance: this.state.initialDistance,
      units: this.state.distanceUnit,
      hours: this.state.initialHours,
      minutes: this.state.initialMinutes,
      seconds: this.state.initialSeconds,
    };
    let data1 = getWorkoutPace(data);
    let data2 = getV02max(data);
    this.setState({
      workoutPace: data1,
      v02max: data2,
    });
  };

  reset = () => {
    this.setState({
      v02max: 0,
      workoutPace: "",
    });
  };

  render() {
    return (
      <React.Fragment>
        <Form>
          <Form.Group controlId="enter">
            <Button
              onClick={(e) => {
                this.showModal();
              }}
              className = "button"
            >
              +
            </Button>
          </Form.Group>
        </Form>
        <Modal
          show={this.state.show}
          onShow={this.reset}
          onHide={this.showModal}
        >
          <Modal.Header closeButton>Add Runner</Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="John O'Brien"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="john@gmail.com"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Runner Experience</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  name="experience"
                  as="select"
                >
                  <option hidden>Level</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Professional</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Runner Year</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  name="gradYear"
                  as="select"
                >
                  <option hidden>Class</option>
                  <option>Freshmen</option>
                  <option>Sophomore</option>
                  <option>Junior</option>
                  <option>Senior</option>
                </Form.Control>
              </Form.Group>
              <AddRunnerV02 handleChange={this.handleChange} />
              <Button variant="primary" onClick={this.handleCalculate}>
                Calculate
              </Button>
              <Button variant="primary" onClick={this.handleAddRunner}>
                Add Runner
              </Button>
            </Form>
            <h3>Workout Pace: {this.state.workoutPace}</h3>
            <h3>V02 Max: {this.state.v02max}</h3>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(null, { newRunner })(AddRunner);
