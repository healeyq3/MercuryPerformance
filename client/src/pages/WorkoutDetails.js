import React, { Component } from 'react'
import { Container, Nav, Row, Col, Card } from 'react-bootstrap'
import WorkoutBlueprintDayCard from '../components/workout/WorkoutBlueprintDayCard'
import WorkoutDetailsCard from '../components/workout/WorkoutDetailsCard'
import ExistingWorkoutGraph from '../components/workout/ExistingWorkoutGraph'
import { connect } from 'react-redux';
import WorkoutImplementor from '../components/workout/WorkoutImplementor';
import { getActualWorkouts } from '../actions/workoutActions'
import PropTypes from 'prop-types';

export class WorkoutDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            showNewDate: false
        }
    }
    
    setDate(){
        window.location.href="./workoutdatedetails"
        console.log("clicked")
    }

    setShow = e => {
        console.log("SetShow called");
        console.log(!this.state.showNewDate);
        this.setState({
            showNewDate: !this.state.showNewDate
        })
    }

    render() {
        if(!this.props.selectedTeam || !this.props.selectedBlueprint){
            return null;
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
                    <WorkoutBlueprintDayCard onSelect = {this.setDate}/>
                    <WorkoutBlueprintDayCard onSelect = {this.setDate}/>
                </Card>
                <Card className = "text-center" tag="a" onClick = {this.setShow} style = {{cursor:"pointer"}}>
                    <p/>
                    <Card.Title>New Date</Card.Title>
                    <p/>
                </Card>
                <WorkoutImplementor show={this.state.showNewDate} setShow = {this.setShow} teamUID = {this.props.selectedTeam} reps = {this.props.blueprints[this.props.selectedBlueprint].reps}/>
                </Col>
                <Col>
                <Row>
                <ExistingWorkoutGraph team = {this.props.teams[this.props.selectedTeam]} reps = {this.props.blueprints[this.props.selectedBlueprint].reps}/>
                </Row>
                <Row>
                    <WorkoutDetailsCard/>
                </Row>
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
    selectedBlueprint: PropTypes.string.isRequired
}

const mapStateToProps = function(state){
    return {
        teams: state.teams.teams,
        selectedTeam: state.teams.selectedTeam,
        blueprints: state.workouts.blueprints,
        selectedBlueprint: state.workouts.selectedBlueprint
    }
}

export default connect(mapStateToProps, { getActualWorkouts }) (WorkoutDetails)
