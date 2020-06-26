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
            show: false
        }
    }
    
    setDate(){
        window.location.href="./workoutdatedetails"
        console.log("clicked")
    }

    setShow = e => {
        console.log("SetShow called");
        this.setState({
            show: !this.state.show
        })
    }

    componentDidMount() {
        this.props.getActualWorkouts()
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
                    <WorkoutBlueprintDayCard onSelect = {this.setDate}></WorkoutBlueprintDayCard>
                    <WorkoutBlueprintDayCard onSelect = {this.setDate}></WorkoutBlueprintDayCard>
                </Card>
                <Card className = "text-center" tag="a" onClick = {this.setShow} style = {{cursor:"pointer"}}>
                    <p></p>
                    <Card.Title>New Date</Card.Title>
                    <p></p>
                    <WorkoutImplementor show = {this.state.show} setShow = {this.setShow} teamUID = {this.props.selectedTeam} reps = {this.props.blueprints[this.props.selectedBlueprint].reps}/>
                </Card>
                </Col>
                <Col>
                <Row>
                <ExistingWorkoutGraph team = {this.props.teams[this.props.selectedTeam]} reps = {this.props.blueprints[this.props.selectedBlueprint].reps}></ExistingWorkoutGraph>
                </Row>
                <Row>
                    <WorkoutDetailsCard></WorkoutDetailsCard>
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
    selectedBlueprint: PropTypes.string.isRequired,
    getActualWorkouts: PropTypes.func.isRequired,
    workouts: PropTypes.object.isRequired
}

const mapStateToProps = function(state){
    return {
        teams: state.teams.teams,
        selectedTeam: state.teams.selectedTeam,
        blueprints: state.workouts.blueprints,
        selectedBlueprint: state.workouts.selectedBlueprint,
        workouts: state.workouts.actualWorkouts
    }
}

export default connect(mapStateToProps, { getActualWorkouts }) (WorkoutDetails)
