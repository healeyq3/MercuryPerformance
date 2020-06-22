import React, { Component } from 'react'
import { Container, Nav, Row, Col, Card } from 'react-bootstrap'
import WorkoutBlueprintDayCard from '../components/workout/WorkoutBlueprintDayCard'
import WorkoutDetailsCard from '../components/workout/WorkoutDetailsCard'
import ExistingWorkoutGraph from '../components/workout/ExistingWorkoutGraph'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class WorkoutDetails extends Component {
    setDate(){
        window.location.href="./workoutdatedetails"
        console.log("clicked")
    }

    render() {
        if(!this.props.selectedTeam || !this.props.selectedBlueprint){
            return null;
        }

        return (
            <Container>
            <Container fluid>
                <Nav fill variant="tabs" className="justify-content-center">
                <Nav.Item>
                    <Nav.Link href = "./workoutdetails">Workout Name</Nav.Link>
                </Nav.Item>
                </Nav>
                <Nav fill variant="tabs" className="justify-content-center">
                <Nav.Item>
                    <Row className = "justify-content-center">
                    <Nav.Link href = "./workoutcreator">Edit Blueprint</Nav.Link>
                    <Nav.Link href = "./workouts">Delete</Nav.Link>
                    </Row>
                </Nav.Item>
                </Nav>
            </Container>
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
            </Container>
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

export default connect(mapStateToProps, { }) (WorkoutDetails)
