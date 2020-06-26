import React, { Component } from 'react'
import { Col, Row, Card, Form, Container } from 'react-bootstrap'
import WorkoutNavBar from '../components/workout/WorkoutNavBar'
import WorkoutDateDetailsCard from '../components/workout/WorkoutDateDetailsCard'
import WorkoutAddRunnersModal from '../components/workout/WorkoutAddRunnersModal'
import AddResultsModal from '../components/workout/AddResultsModal'
import WorkoutRunnerCard from '../components/workout/WorkoutRunnerCard'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addRunnersToWorkout, resetRunnerAdded } from '../actions/workoutActions'

export class WorkoutDateDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
          showRunner: false,
          showResults:false,
          reloaded:false
        }
    }
    setShowRunner = e => {
        this.setState({
            showRunner: !this.state.showRunner
        })
      }
      setShowResults = e => {
        this.setState({
            showResults: !this.state.showResults
        })
      }
      setSelectedRunner = runner => {
        console.log("Printing runner");
        console.log(runner);
      }
    render() {
        if(this.props.selectedWorkout){
            return null;
        }

       /*let runnersInWorkout = [];
        if(this.props.workouts.actualWorkouts[this.props.selectedWorkout].hasOwnProperty('runners') === true){
            console.log(this.props.workouts.actualWorkouts[this.props.selectedWorkout].runners);
            console.log(this.props.rehydrated);
            for(const runner in this.props.workouts.actualWorkouts[this.props.selectedWorkout].runners){
                if(this.props.workouts.actualWorkouts[this.props.selectedWorkout].runners.hasOwnProperty(runner)){
                    runnersInWorkout.push(
                        <React.Fragment key = {runner}>
                            <WorkoutRunnerCard setShow = {this.setShowResults}runner = {this.props.runners[runner]} />
                        </React.Fragment>
                    )
                }
            }
        }*/
        return (
            <Container>
                <Col>
                    <WorkoutNavBar setShowRunner = {this.setShowRunner} setShowResults = {this.setShowResults}/>
                    <br/>
                    <Row>
                        <Col>
                            <Card className = "text-center">
                                <Card.Header>Runners</Card.Header>
                                {/*runnersInWorkout*/}
                                <WorkoutRunnerCard></WorkoutRunnerCard>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <WorkoutDateDetailsCard/>
                <Row>
                  <Col>
                  <Card className = "text-center">
                    <Card.Title>Notes</Card.Title>
                    <Form>
                      <Form.Control as ="textarea">

                      </Form.Control>
                    </Form>
                  </Card>
                  </Col>
                </Row>
                <WorkoutAddRunnersModal show = {this.state.showRunner} setShow = {this.setShowRunner} teamUID = {this.props.selectedTeam}/>
                <AddResultsModal show = {this.state.showResults} setShow = {this.setShowResults}/>
        </Container>
        )
        }
}
/*
WorkoutDateDetails.propTypes = {
    addRunnersToWorkout: PropTypes.func.isRequired,
    resetRunnerAdded: PropTypes.func.isRequired,
    selectedWorkout: PropTypes.string.isRequired,
    times: PropTypes.object,
    workouts: PropTypes.object.isRequired,
    runners: PropTypes.object.isRequired,
    hasAddedRunner: PropTypes.bool.isRequired
  };
  const mapStateToProps = function(state){
    return {
      selectedWorkout: state.workouts.selectedWorkout,
      times: state.workouts.times,
      rehydrated: state._persist.rehydrated,
      workouts: state.workouts.actualWorkouts,
      runners: state.runners.runners,
      hasAddedRunner: state.events.hasAddedRunner
    }
  }*/

export default connect(null, { addRunnersToWorkout, resetRunnerAdded}) (WorkoutDateDetails)
