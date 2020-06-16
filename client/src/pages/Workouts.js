import React, { Component } from 'react'
import { Container, Nav, Card, Row, Col } from 'react-bootstrap'
import ExistingWorkoutCard from '../components/workout/ExistingWorkoutCard'
import CreateWorkoutModal from '../components/workout/CreateWorkoutModal';

export class Workouts extends Component {
    constructor(props){
        super(props);
        this.state = {
          show: false,
          reloaded:false
        }
    }

    setShow = e => {
        this.setState({
            show: !this.state.show
        })
      }
    setSelectedWorkout(workout){
        //this.props.setEvent(event.key);
        console.log("workout selected ");
        window.location.href='./workoutdetails'
      }
      
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
                    <ExistingWorkoutCard onSelect = {this.setSelectedWorkout}></ExistingWorkoutCard>
                    <ExistingWorkoutCard onSelect = {this.setSelectedWorkout}></ExistingWorkoutCard>
                </Card>
                </Col>
                <Col>
                <Card className = "text-center" tag="a" onClick = {this.setShow} style = {{cursor:"pointer"}}>
                    <p></p>
                    <Card.Title>New Workout</Card.Title>
                    <p></p>
                </Card>
                </Col>
            </Row>
            <CreateWorkoutModal setShow = {this.setShow} show = {this.state.show}></CreateWorkoutModal>
            </Container>
        )
    }
}

export default Workouts
