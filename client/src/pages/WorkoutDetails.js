import React, { Component } from 'react'
import { Container, Nav, Row, Col, Card } from 'react-bootstrap'
import WorkoutBlueprintDayCard from '../components/workout/WorkoutBlueprintDayCard'
import ExistingWorkoutGraph from '../components/workout/ExistingWorkoutGraph'
import { connect } from 'react-redux';
import WorkoutImplementor from '../components/workout/WorkoutImplementor';
import { getActualWorkouts, setWorkout } from '../actions/workoutActions'
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";
import { distanceToTime, secondsToAnswer } from '../math/TimeConversions';

export class WorkoutDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            toWorkoutDate: false
        }
    }
    
    setDate(){
        window.location.href="./workoutdatedetails"
    }

    setShow = e => {
        this.setState({
            showNewDate: !this.state.showNewDate
        })
    }

    setSelectedWorkout = workout => {
        console.log(workout.key);
        this.props.setWorkout(workout.key)
        this.setState({
            toWorkoutDate: true
        })
      }

    componentDidUpdate(prevProps, prevState, ss){
        if(prevProps.rehydrated === false){
            this.props.getActualWorkouts(this.props.selectedTeam, this.props.selectedBlueprint);
        }
      }

    render() {
        if(this.state.toWorkoutDate){
            console.log("Redirecting")
            return <Redirect to='/workoutdatedetails' />
        }
        if(!this.props.selectedTeam || !this.props.selectedBlueprint || !this.props.blueprints[this.props.selectedBlueprint]){
            //return <Redirect to='/workouts'/>;
             return null;
        }

        let cardItems = [];
        for(const workoutuid in this.props.workouts){
            if(this.props.workouts.hasOwnProperty(workoutuid)){
                cardItems.push(
                    <React.Fragment key = {workoutuid}>
                        <WorkoutBlueprintDayCard onSelect = {this.setSelectedWorkout} workout = {this.props.workouts[workoutuid]} />
                    </React.Fragment>
                    
                )
            }
        }
        let repItems = [];
        let time;
        for(const rep in this.props.blueprints[this.props.selectedBlueprint].reps){
            console.log(rep)
            if(this.props.blueprints[this.props.selectedBlueprint].reps[rep].minutes!==undefined){
                repItems.push(
                    <React.Fragment>
                        <Card className = "text-center" style = {{ height:'100%', orientation: 'horizontal'}}>
                        <Row>
                            <Col>
                        <Card.Title>{this.props.blueprints[this.props.selectedBlueprint].reps[rep].type}</Card.Title>
                        </Col>
                        <Col>
                        <Card.Title>{this.props.blueprints[this.props.selectedBlueprint].reps[rep].hours}:{this.props.blueprints[this.props.selectedBlueprint].reps[rep].minutes}:{this.props.blueprints[this.props.selectedBlueprint].reps[rep].seconds}</Card.Title>
                        </Col>
                        </Row>
                        </Card>
                        </React.Fragment>
                )
            }
            else{
                repItems.push(
                        <React.Fragment>
                        <Card className = "text-center" style = {{ height:'100%', orientation: 'horizontal'}}>
                            <Row>
                                <Col>
                        <Card.Title>{this.props.blueprints[this.props.selectedBlueprint].reps[rep].type}</Card.Title>
                        </Col>
                        <Col>
                <Card.Title>{this.props.blueprints[this.props.selectedBlueprint].reps[rep].distance} {this.props.blueprints[this.props.selectedBlueprint].reps[rep].distanceUnit}</Card.Title>
                        </Col>
                        </Row>
                        </Card>
                        </React.Fragment>
                    
                )
            }
        }
        return (
            
            // <Container>
            <React.Fragment>
                <Row>
                    <Container fluid>
                    <Nav fill variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link href = "./workoutdetails">Workout Name</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href = "./workoutcreator">Edit Blueprint</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href = "./workouts">Delete</Nav.Link>
                    </Nav.Item>
                    </Nav>
                    </Container>
                </Row>
            
            <Row>
                <Col>
                <Card className = "text-center">
                    <Card.Header>Workout Dates</Card.Header>
                    {cardItems}
                </Card>
                <Card className = "text-center" tag="a" onClick = {this.setShow} style = {{cursor:"pointer"}}>
                    <p/>
                    <Card.Title>New Date</Card.Title>
                    <p/>
                </Card>
                <WorkoutImplementor blueprint = {this.props.selectedBlueprint}show={this.state.showNewDate} setShow = {this.setShow} teamUID = {this.props.selectedTeam} reps = {this.props.blueprints[this.props.selectedBlueprint].reps}/>
                </Col>
                <Col>
                <Row>
                <ExistingWorkoutGraph team = {this.props.teams[this.props.selectedTeam]} reps = {this.props.blueprints[this.props.selectedBlueprint].reps}/>
                </Row>
                
                    <Col>
                    <Card className = "text-center">
                        <Card.Header>Reps</Card.Header>
                    {repItems}
                    </Card>
                    </Col>
                
                </Col>
            </Row>
            </React.Fragment>
        )
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
    setWorkout: PropTypes.func.isRequired
}

const mapStateToProps = function(state){
    return {
        teams: state.teams.teams,
        selectedTeam: state.teams.selectedTeam,
        blueprints: state.workouts.blueprints,
        selectedBlueprint: state.workouts.selectedBlueprint,
        workouts: state.workouts.actualWorkouts,
        rehydrated: state._persist.rehydrated
    }
}

export default connect(mapStateToProps, { getActualWorkouts, setWorkout }) (WorkoutDetails)
