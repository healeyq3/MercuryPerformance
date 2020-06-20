import React, { Component } from 'react'
import { Container, Nav, Row, Col, Card } from 'react-bootstrap'
import WorkoutBlueprintDayCard from '../components/workout/WorkoutBlueprintDayCard'
import WorkoutDetailsCard from '../components/workout/WorkoutDetailsCard'

export class WorkoutDetails extends Component {
    render() {
        return (
            <Container>
            <Container fluid>
                <Nav fill variant="tabs" className="justify-content-center">
                <Nav.Item>
                    <Nav.Link href = "./workoutdetails">Workout Name</Nav.Link>
                </Nav.Item>
                </Nav>
            </Container>
            <Row>
                <Col>
                <Card className = "text-center">
                    <Card.Header>Workout Dates</Card.Header>
                    <WorkoutBlueprintDayCard></WorkoutBlueprintDayCard>
                    <WorkoutBlueprintDayCard></WorkoutBlueprintDayCard>
                </Card>
                <Card className = "text-center" tag="a" onClick = {this.setShow} style = {{cursor:"pointer"}}>
                    <p></p>
                    <Card.Title>New Date</Card.Title>
                    <p></p>
                </Card>
                </Col>
                <Col>
                <Row>
                <Card>
                    <Card.Header className = "text-center">Graph</Card.Header>
                </Card>
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
