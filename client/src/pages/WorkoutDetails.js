import React, { Component } from "react";
import { Container, Nav, Row, Col, Card, Button, Form } from "react-bootstrap";
import WorkoutBlueprintDayCard from "../components/workout/WorkoutBlueprintDayCard";
import ExistingWorkoutGraph from "../components/workout/ExistingWorkoutGraph";
import { connect } from "react-redux";
import WorkoutImplementor from "../components/workout/WorkoutImplementor";
import {
  getActualWorkouts,
  setWorkout,
  getWorkoutBlueprints,
} from "../actions/workoutActions";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import WarmupDistancePopover from "../components/workout/WarmupDistancePopover";
import CooldownDistancePopover from "../components/workout/CooldownDistancePopover";
import RepDistancePopover from "../components/workout/RepDistancePopover";
import CooldownDurationPopover from "../components/workout/CooldownDurationPopover";
import WarmupDurationPopover from "../components/workout/WarmupDurationPopover";
import RepDurationPopover from "../components/workout/RepDurationPopover";
import { updateBlueprint, setBlueprint } from "../actions/workoutActions";
import RepsCard from "../components/workout/RepsCard";
import update from "immutability-helper";
import {
  totalSeconds,
  distanceToTime,
  secondsToAnswer,
} from "../math/TimeConversions";
import { getDistance2 } from "../math/V02max";

export class WorkoutDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      toWorkoutDate: false,
      toEditor: false,
      name: "",
      reps: [],
      totalSeconds: 0,
      totalDistance: 0,
      show2: false,
    };
    // this.goToEditor = this.goToEditor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  setDate() {
    window.location.href = "./workoutdatedetails";
  }

  setShow = (e) => {
    this.setState({
      showNewDate: !this.state.showNewDate,
    });
  };

  setSelectedWorkout = (workout) => {
    console.log(workout.key);
    this.props.setWorkout(workout.key);
    this.setState({
      toWorkoutDate: true,
    });
  };

  setShow2 = (e) => {
    this.setState({
      show2: !this.state.show,
    });
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleUpdateWorkout = () => {
    let blueprintData = {};
    if (
      this.props.blueprints[this.props.selectedBlueprint].hasOwnProperty(
        "workouts"
      )
    ) {
      blueprintData = {
        name: this.state.name,
        reps: this.state.reps,
        blueprintuid: this.props.selectedBlueprint,
        workouts: this.props.blueprints[this.props.selectedBlueprint].workouts,
        totalSeconds: this.state.totalSeconds,
        totalDistance: this.state.totalDistance,
      };
    } else {
      blueprintData = {
        name: this.state.name,
        reps: this.state.reps,
        blueprintuid: this.props.selectedBlueprint,
        totalSeconds: this.props.totalSeconds,
        totalDistance: this.props.totalDistance,
      };
    }
    console.log(blueprintData);
    this.props.updateBlueprint(blueprintData, this.props.selectedTeam);
    this.setState({
      toEditor: false,
    });
  };

  handleCreate = (repData) => {
    let arr = this.state.reps;
    arr.push(...repData);
    console.log(arr);
    this.setState({ reps: arr });
    this.sumTotal(repData);
  };

  sumTotal = (reps) => {
    const teamPace = this.props.teams[this.props.selectedTeam].hasOwnProperty(
      "medianWPace"
    )
      ? this.props.teams[this.props.selectedTeam].medianWPace
      : 6.5;
    console.log("Reps: ");
    console.log(reps);
    let updatedTime = 0;
    let updatedDistance = 0;
    for (const rep in reps) {
      if (reps[rep].distanceUnit === undefined) {
        console.log("If Reached");
        let timeData = {
          hours: reps[rep].hours,
          minutes: reps[rep].minutes,
          seconds: reps[rep].seconds,
        };
        let amountOfTime = totalSeconds(timeData);
        let pd = amountOfTime / ((teamPace * 60) / (reps[rep].percent / 100));
        let predictedDistance = Math.round(pd * 100) / 100;
        updatedTime = updatedTime + amountOfTime;
        updatedDistance = updatedDistance + predictedDistance;
      } else {
        console.log("Else reached");
        let secondsForRep = distanceToTime(
          reps[rep].distance,
          reps[rep].distanceUnit,
          (teamPace * 60) / (reps[rep].percent / 100)
        );
        console.log(secondsForRep);
        updatedDistance =
          updatedDistance +
          getDistance2(reps[rep].distance, reps[rep].distanceUnit);
        console.log(updatedDistance);
        updatedTime = updatedTime + secondsForRep;
        console.log(updatedTime, updatedDistance);
      }
    }
    updatedTime = this.state.totalTime + updatedTime;
    updatedDistance = this.state.totalDistance + updatedDistance;
    this.setState({
      totalTime: updatedTime,
      totalDistance: updatedDistance,
    });
  };

  handleDelete(index) {
    let toReturn = this.state.reps;
    let toDelete = toReturn[index];
    this.deleteInformation(toDelete);
    toReturn.splice(index, 1);
    this.setState({
      reps: toReturn,
    });
  }

  deleteInformation = (toDelete) => {
    console.log("method called");
    const teamPace = this.props.teams[this.props.selectedTeam].hasOwnProperty(
      "medianWPace"
    )
      ? this.props.teams[this.props.selectedTeam].medianWPace
      : 6.5;
    if (toDelete.distanceUnit === undefined) {
      console.log("if reached");
      let timeData = {
        hours: toDelete.hours,
        minutes: toDelete.minutes,
        seconds: toDelete.seconds,
      };
      let timeToDelete = totalSeconds(timeData);
      let pd = timeToDelete / ((teamPace * 60) / (toDelete.percent / 100));
      let predictedDistance = Math.round(pd * 100) / 100;
      let updatedTime = this.state.totalTime - timeToDelete;
      let updatedDistance = this.state.totalDistance - predictedDistance;
      this.setState({
        totalTime: updatedTime,
        totalDistance: updatedDistance,
      });
    } else {
      console.log("else reached");
      let secondsForRep = distanceToTime(
        toDelete.distance,
        toDelete.distanceUnit,
        (teamPace * 60) / (toDelete.percent / 100)
      );
      let updatedDistance =
        this.state.totalDistance -
        getDistance2(toDelete.distance, toDelete.distanceUnit);
      let updatedTime = this.state.totalTime - secondsForRep;
      this.setState({
        totalTime: updatedTime,
        totalDistance: updatedDistance,
      });
    }
    console.log(this.state.totalTime, this.state.totalDistance);
  };

  handleEdit(rep, index) {
    let toReturn = this.state.reps;
    toReturn[index] = rep;
    this.setState({
      rep: toReturn,
    });
  }

  moveCard = (dragIndex, hoverIndex) => {
    const dragRep = this.state.reps[dragIndex];
    this.setState(
      update(this.state, {
        reps: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRep],
          ],
        },
      })
    );
  };

  reset = () => {
    if (
      this.props.blueprints[this.props.selectedBlueprint].hasOwnProperty("name")
    ) {
      this.setState({
        name: this.props.blueprints[this.props.selectedBlueprint].name,
      });
    }
    if (
      this.props.blueprints[this.props.selectedBlueprint].hasOwnProperty("reps")
    ) {
      this.setState({
        reps: this.props.blueprints[this.props.selectedBlueprint].reps,
      });
    }
    if (
      this.props.blueprints[this.props.selectedBlueprint].hasOwnProperty(
        "totalSeconds"
      )
    ) {
      console.log("Got to total Seconds");
      this.setState({
        totalSeconds: this.props.blueprints[this.props.selectedBlueprint]
          .totalSeconds,
      });
    }
    if (
      this.props.blueprints[this.props.selectedBlueprint].hasOwnProperty(
        "totalDistance"
      )
    ) {
      console.log("Got to total distance");
      this.setState({
        totalDistance: this.props.blueprints[this.props.selectedBlueprint]
          .totalDistance,
      });
    }
  };

  componentDidUpdate(prevProps) {
    console.log("Component Updated");
    if (prevProps.rehydrated === false) {
      this.props.getActualWorkouts(
        this.props.selectedTeam,
        this.props.selectedBlueprint
      );
      this.props.getWorkoutBlueprints(this.props.selectedTeam);
      console.log("First two calls");
      if (
        this.props.blueprints[this.props.selectedBlueprint].hasOwnProperty(
          "name"
        )
      ) {
        console.log("Got to name");
        this.setState({
          name: this.props.blueprints[this.props.selectedBlueprint].name,
        });
      }
      if (
        this.props.blueprints[this.props.selectedBlueprint].hasOwnProperty(
          "reps"
        )
      ) {
        console.log("Got to reps");
        this.setState({
          reps: this.props.blueprints[this.props.selectedBlueprint].reps,
        });
      }
      if (
        this.props.blueprints[this.props.selectedBlueprint].hasOwnProperty(
          "totalSeconds"
        )
      ) {
        console.log("Got to total Seconds");
        this.setState({
          totalSeconds: this.props.blueprints[this.props.selectedBlueprint]
            .totalSeconds,
        });
      }
      if (
        this.props.blueprints[this.props.selectedBlueprint].hasOwnProperty(
          "totalDistance"
        )
      ) {
        console.log("Got to total distance");
        this.setState({
          totalDistance: this.props.blueprints[this.props.selectedBlueprint]
            .totalDistance,
        });
      }
    }
  }

  render() {
    if (this.state.toWorkoutDate) {
      console.log("Redirecting");
      return <Redirect to="/workoutdatedetails" />;
    }
    if (
      !this.props.selectedTeam ||
      !this.props.selectedBlueprint ||
      !this.props.blueprints[this.props.selectedBlueprint]
    ) {
      //return <Redirect to='/workouts'/>;
      return null;
    }
    if (this.state.reps.length === 0 && this.state.name === "") {
      console.log("Saw this");
      this.reset();
    }

    let cardItems = [];
    for (const workoutuid in this.props.workouts) {
      if (this.props.workouts.hasOwnProperty(workoutuid)) {
        cardItems.push(
          <React.Fragment key={workoutuid}>
            <WorkoutBlueprintDayCard
              onSelect={this.setSelectedWorkout}
              workout={this.props.workouts[workoutuid]}
            />
          </React.Fragment>
        );
      }
    }
    let repItems = [];
    for (const rep in this.props.blueprints[this.props.selectedBlueprint]
      .reps) {
      console.log(rep);
      if (
        this.props.blueprints[this.props.selectedBlueprint].reps[rep]
          .minutes !== undefined
      ) {
        repItems.push(
          <React.Fragment>
            <Card
              className="text-center"
              style={{ height: "100%", orientation: "horizontal" }}
            >
              <Row>
                <Col>
                  <Card.Title>
                    {
                      this.props.blueprints[this.props.selectedBlueprint].reps[
                        rep
                      ].type
                    }
                  </Card.Title>
                </Col>
                <Col>
                  <Card.Title>
                    {
                      this.props.blueprints[this.props.selectedBlueprint].reps[
                        rep
                      ].hours
                    }
                    :
                    {
                      this.props.blueprints[this.props.selectedBlueprint].reps[
                        rep
                      ].minutes
                    }
                    :
                    {
                      this.props.blueprints[this.props.selectedBlueprint].reps[
                        rep
                      ].seconds
                    }
                  </Card.Title>
                </Col>
              </Row>
            </Card>
          </React.Fragment>
        );
      } else {
        repItems.push(
          <React.Fragment>
            <Card
              className="text-center"
              style={{ height: "100%", orientation: "horizontal" }}
            >
              <Row>
                <Col>
                  <Card.Title>
                    {
                      this.props.blueprints[this.props.selectedBlueprint].reps[
                        rep
                      ].type
                    }
                  </Card.Title>
                </Col>
                <Col>
                  <Card.Title>
                    {
                      this.props.blueprints[this.props.selectedBlueprint].reps[
                        rep
                      ].distance
                    }{" "}
                    {
                      this.props.blueprints[this.props.selectedBlueprint].reps[
                        rep
                      ].distanceUnit
                    }
                  </Card.Title>
                </Col>
              </Row>
            </Card>
          </React.Fragment>
        );
      }
    }
    return (
      // <Container>

      <React.Fragment>
        <Row>
          <Container fluid>
            <Nav fill variant="tabs" className="justify-content-center">
              <Nav.Item>
                <Nav.Link
                  onClick={() =>
                    this.setState((state) => ({ toEditor: false }))
                  }
                >
                  Workout Name
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => this.setState((state) => ({ toEditor: true }))}
                >
                  Edit Blueprint
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="./workouts">Delete</Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
        </Row>
        {this.state.toEditor === false ? (
          <React.Fragment>
            <Row>
              <Col>
                <Card className="text-center">
                  <Card.Header>Workout Dates</Card.Header>
                  {cardItems}
                  <Card
                    className="text-center"
                    tag="a"
                    onClick={this.setShow}
                    style={{ cursor: "pointer" }}
                  >
                    <p />
                    <Card.Title>New Date</Card.Title>
                    <p />
                  </Card>
                </Card>

                <WorkoutImplementor
                  blueprint={this.props.selectedBlueprint}
                  blueprintName = {this.props.blueprints[this.props.selectedBlueprint].name}
                  show={this.state.showNewDate}
                  setShow={this.setShow}
                  teamUID={this.props.selectedTeam}
                  reps={
                    this.props.blueprints[this.props.selectedBlueprint].reps
                  }
                />
              </Col>
              <Col>
                <Row>
                  <ExistingWorkoutGraph
                    team={this.props.teams[this.props.selectedTeam]}
                    reps={
                      this.props.blueprints[this.props.selectedBlueprint].reps
                    }
                  />
                </Row>
                {/* <Row>
                    <Col>
                    <Card className = "text-center">
                        <Card.Header>Reps</Card.Header>
                    {repItems}
                    </Card>
                    </Col>
                    </Row> */}
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Card className="text-center">
                  <Card.Header>Workout Details</Card.Header>
                </Card>
              </Col>
            </Row>
          </React.Fragment>
        ) : (
          <Row>
            <Col sm={4}>
              <Card className="text-center">
                <Card.Header>Edit Workout</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label>Workout Name</Form.Label>
                      <Form.Control
                        onChange={this.handleChange}
                        name="name"
                        type="text"
                        value={this.state.name}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Add Warmup</Form.Label>
                    </Form.Group>
                    <Row>
                      <Col />
                      <Col>
                        <WarmupDistancePopover addArr={this.handleCreate} />
                      </Col>
                      <Col>
                        <WarmupDurationPopover addArr={this.handleCreate} />
                      </Col>
                      <Col />
                    </Row>
                    <p />
                    <Form.Group>
                      <Form.Label>Add Rep</Form.Label>
                    </Form.Group>
                    <Row>
                      <Col />
                      <Col>
                        <RepDistancePopover addArr={this.handleCreate} />
                      </Col>
                      <Col>
                        <RepDurationPopover addArr={this.handleCreate} />
                      </Col>
                      <Col />
                    </Row>
                    <p />
                    <Form.Group>
                      <Form.Label>Add Cooldown</Form.Label>
                    </Form.Group>
                    <Row>
                      <Col />
                      <Col>
                        <CooldownDistancePopover addArr={this.handleCreate} />
                      </Col>
                      <Col>
                        <CooldownDurationPopover addArr={this.handleCreate} />
                      </Col>
                      <Col />
                    </Row>
                    <p />
                    <Button
                      variant="primary"
                      onClick={this.handleUpdateWorkout}
                    >
                      Update
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={8}>
              <ExistingWorkoutGraph
                team={this.props.teams[this.props.selectedTeam]}
                reps={this.state.reps}
              ></ExistingWorkoutGraph>
              <br />
              <Card className="text-center">
                <Card.Header>
                  <Row>
                    <Col>
                      Total Distance:{" "}
                      {Math.round(this.state.totalDistance * 100) / 100} miles
                    </Col>
                    <Col>
                      Total Time: {secondsToAnswer(this.state.totalSeconds)}
                    </Col>
                  </Row>
                </Card.Header>
                {this.state.reps.map((rep, i) => (
                  <RepsCard
                    rep={rep}
                    index={i}
                    moveCard={this.moveCard}
                    onDelete={this.handleDelete}
                    onEdit={this.handleEdit}
                    setShow={this.setShow}
                    show={this.state.show}
                  />
                ))}
              </Card>
            </Col>
          </Row>
        )}
      </React.Fragment>
    );
  }
}

WorkoutDetails.propTypes = {
  selectedTeam: PropTypes.string.isRequired,
  rehydrated: PropTypes.bool.isRequired,
  teams: PropTypes.object.isRequired,
  blueprints: PropTypes.object.isRequired,
  selectedBlueprint: PropTypes.string.isRequired,
  getActualWorkouts: PropTypes.func.isRequired,
  workouts: PropTypes.object.isRequired,
  setWorkout: PropTypes.func.isRequired,
  updateBlueprint: PropTypes.func.isRequired,
};

const mapStateToProps = function (state) {
  return {
    teams: state.teams.teams,
    selectedTeam: state.teams.selectedTeam,
    blueprints: state.workouts.blueprints,
    selectedBlueprint: state.workouts.selectedBlueprint,
    workouts: state.workouts.actualWorkouts,
    rehydrated: state._persist.rehydrated,
  };
};

export default connect(mapStateToProps, {
  getWorkoutBlueprints,
  getActualWorkouts,
  setWorkout,
  updateBlueprint,
  setBlueprint,
})(WorkoutDetails);
