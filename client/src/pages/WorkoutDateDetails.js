import React, { Component } from 'react'
import { Col, Row, Card, Form, Container } from 'react-bootstrap'
import WorkoutNavBar from '../components/workout/WorkoutNavBar'
import WorkoutDateDetailsCard from '../components/workout/WorkoutDateDetailsCard'
import WorkoutAddRunnersModal from '../components/workout/WorkoutAddRunnersModal'
import AddResultsModal from '../components/workout/AddResultsModal'
import WorkoutRunnerCard from '../components/workout/WorkoutRunnerCard'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRunnersToWorkout, resetRunnerAdded } from '../actions/workoutActions';

export class WorkoutDateDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
          showRunner: false,
          showResults:false,
          reloaded:false,
          runnerCount: 0
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.rehydrated === false){
            console.log(this.props);
            if(!this.props.workouts[this.props.selectedWorkout].runners){
                return;
            }
            this.setState({
                runnerCount: Object.keys(this.props.workouts[this.props.selectedWorkout].runners).length
            })
        } else if(this.props.hasAddedRunner){
            this.setState({
                runnerCount: Object.keys(this.props.workouts[this.props.selectedWorkout].runners).length
            })
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
        if(!this.props.selectedWorkout || !this.props.workouts){
            return null;
        }

        let runnersInWorkout = [];

        console.log(this.props.selectedWorkout);
        console.log(this.props.workouts);

        if(this.props.workouts[this.props.selectedWorkout].runners){
            console.log(Object.keys(this.props.workouts[this.props.selectedWorkout].runners).length)
        }

        if(this.props.hasAddedRunner && this.state.runnerCount === Object.keys(this.props.workouts[this.props.selectedWorkout].runners).length){
            this.props.resetRunnerAdded();
        }

        if(this.props.workouts[this.props.selectedWorkout].hasOwnProperty('runners') === true){
            for(const runner in this.props.workouts[this.props.selectedWorkout].runners){
                if(this.props.workouts[this.props.selectedWorkout].runners.hasOwnProperty(runner)){
                    runnersInWorkout.push(
                        <React.Fragment>
                            <WorkoutRunnerCard setShow = {this.setShowResults} runner = {this.props.runners[runner]} reps = {this.props.workouts[this.props.selectedWorkout].reps} />
                        </React.Fragment>
                        
                    )
                }
            }
        }

        // console.log(this.props.workouts[this.props.selectedWorkout].reps);

        return (
            <Container>
                
                    <WorkoutNavBar setShowRunner = {this.setShowRunner} setShowResults = {this.setShowResults}/>
                    <br/>
                    <Row>
                        <Col sm = {6}>
                            <Card className = "text-center">
                                <Card.Header>Runners</Card.Header>
                                {runnersInWorkout}
                            </Card>
                        </Col>
                    
                
                
                </Row>
                <Row>
                <Col sm = {5}>
                    <WorkoutDateDetailsCard/>
                </Col>
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
WorkoutDateDetails.propTypes = {
    addRunnersToWorkout: PropTypes.func.isRequired,
    resetRunnerAdded: PropTypes.func.isRequired,
    selectedWorkout: PropTypes.string.isRequired,
    runners: PropTypes.object.isRequired,
    workouts: PropTypes.object.isRequired
}


const mapStateToProps = function(state){
    return {
        selectedWorkout: state.workouts.selectedWorkout,
        rehydrated: state._persist.rehydrated,
        runners: state.runners.runners,
        hasAddedRunner: state.workouts.hasAddedRunner,
        workouts: state.workouts.actualWorkouts
    }
}

export default connect(mapStateToProps, { addRunnersToWorkout, resetRunnerAdded }) (WorkoutDateDetails)
