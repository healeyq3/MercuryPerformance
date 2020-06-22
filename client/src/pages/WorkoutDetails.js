import React, { Component } from 'react'
import { Container, Nav, Row, Col, Card } from 'react-bootstrap'
import WorkoutBlueprintDayCard from '../components/workout/WorkoutBlueprintDayCard'
import WorkoutDetailsCard from '../components/workout/WorkoutDetailsCard'
import ExistingWorkoutGraph from '../components/workout/ExistingWorkoutGraph'

export class WorkoutDetails extends Component {
    setDate(){
        window.location.href="./workoutdatedetails"
        console.log("clicked")
    }
    render() {
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
                <ExistingWorkoutGraph></ExistingWorkoutGraph>
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

export default WorkoutDetails
