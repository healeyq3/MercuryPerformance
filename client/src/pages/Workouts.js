import React, { Component } from 'react'
import { Container, Nav, Card, Row, Col } from 'react-bootstrap'
import ExistingWorkoutCard from '../components/workout/ExistingWorkoutCard'

export class Workouts extends Component {
    render() {
        return (
            <Container>
            <Container fluid>
                <Nav fill variant="tabs" className="justify-content-center">
                <Nav.Item>
                    <Nav.Link href = "./">Team Name</Nav.Link>
                </Nav.Item>
                </Nav>
            </Container>
            <Row>
                <Col>
                <Card className = "text-center">
                    <Card.Header>All Workouts</Card.Header>
                    <ExistingWorkoutCard></ExistingWorkoutCard>
                    <ExistingWorkoutCard></ExistingWorkoutCard>
                </Card>
                </Col>
                <Col>
                <Card className = "text-center" tag="a" onClick style = {{cursor:"pointer"}}>
                    <p></p>
                    <Card.Title>New Workout</Card.Title>
                    <p></p>
                </Card>
                </Col>
            </Row>
            </Container>
        )
    }
}

export default Workouts
