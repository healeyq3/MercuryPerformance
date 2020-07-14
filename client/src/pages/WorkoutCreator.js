import React, { Component } from 'react'
import { Row, Card, Col, Form, Button, Image } from 'react-bootstrap'
import WarmupDistancePopover from '../components/workout/WarmupDistancePopover'
import { CooldownDistancePopover } from '../components/workout/CooldownDistancePopover'
import RepDistancePopover from '../components/workout/RepDistancePopover'
import CooldownDurationPopover from '../components/workout/CooldownDurationPopover'
import WarmupDurationPopover from '../components/workout/WarmupDurationPopover'
import RepDurationPopover from '../components/workout/RepDurationPopover'
import { newWorkoutBlueprint, setBlueprint } from '../actions/workoutActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import ExistingWorkoutGraph from '../components/workout/ExistingWorkoutGraph';
import RepsCard from '../components/workout/RepsCard';
import update from 'immutability-helper'
import { totalSeconds, distanceToTime, secondsToAnswer } from '../math/TimeConversions'
import { getDistance2 } from '../math/V02max'

export class WorkoutCreator extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            reps:[],
            toWorkoutHome: false,
            show: false,
            totalTime: 0,
            totalDistance: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    setShow = e => {
        console.log("Called");
        this.setState({
            show: !this.state.show
        })
    }

    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }

    handleCreateWorkout = () => {
        const workoutData = {
            name: this.state.name,
            reps: this.state.reps,
            totalDistance: this.state.totalDistance,
            totalSeconds: this.state.totalTime
        }
        this.props.newWorkoutBlueprint(workoutData, this.props.selectedTeam);
        this.setState({
            toWorkoutHome: true
          })
    }

    handleCreate = (repData) => {
        let arr = this.state.reps
        arr.push(...repData)
        console.log(arr);
        this.setState({reps:arr})
        this.sumTotal(repData);
    }

    sumTotal = (reps) => {
        const teamPace = this.props.teams[this.props.selectedTeam].hasOwnProperty("averageWPace") ? this.props.teams[this.props.selectedTeam].averageWPace : 6.5;
        console.log("Reps: ")
        console.log(reps)
        let updatedTime = 0;
        let updatedDistance = 0;
        for (const rep in reps){
            if(reps[rep].distanceUnit === undefined){
                console.log("If Reached")
                let timeData = {
                    hours: reps[rep].hours,
                    minutes: reps[rep].minutes,
                    seconds: reps[rep].seconds
                }
                let amountOfTime = totalSeconds(timeData);
                let pd = amountOfTime / ((teamPace * 60) / (reps[rep].percent / 100));
                let predictedDistance = Math.round((pd) * 100) / 100;
                updatedTime = updatedTime +  amountOfTime;
                updatedDistance = updatedDistance + predictedDistance;
            } else {
                console.log("Else reached")
                let secondsForRep = distanceToTime(reps[rep].distance, reps[rep].distanceUnit, ((teamPace * 60) / (reps[rep].percent / 100)));
                console.log(secondsForRep)
                updatedDistance = updatedDistance + getDistance2(reps[rep].distance, reps[rep].distanceUnit);
                console.log(updatedDistance);
                updatedTime = updatedTime + secondsForRep
                console.log(updatedTime, updatedDistance)
            }
        }
        updatedTime = this.state.totalTime + updatedTime;
        updatedDistance = this.state.totalDistance + updatedDistance;
        this.setState({
            totalTime: updatedTime,
            totalDistance: updatedDistance
        })
    }

    handleDelete(index){
        let toReturn = this.state.reps;
        let toDelete = toReturn[index];
        console.log(toDelete)
        this.deleteInformation(toDelete);
        toReturn.splice(index, 1);
        this.setState({
            reps: toReturn
        })
    }

    deleteInformation = (toDelete) => {
        console.log("method called")
        const teamPace = this.props.teams[this.props.selectedTeam].hasOwnProperty("averageWPace") ? this.props.teams[this.props.selectedTeam].averageWPace : 6.5;
        if(toDelete.distanceUnit === undefined){
            console.log("if reached")
            let timeData = {
                hours: toDelete.hours,
                minutes: toDelete.minutes,
                seconds: toDelete.seconds
            }
            let timeToDelete = totalSeconds(timeData);
            let pd = timeToDelete / ((teamPace * 60) / (toDelete.percent / 100));
            let predictedDistance = Math.round((pd) * 100) / 100;
            let updatedTime = this.state.totalTime - timeToDelete;
            let updatedDistance = this.state.totalDistance - predictedDistance;
            this.setState({
                totalTime: updatedTime,
                totalDistance: updatedDistance
            })
        } else {
            console.log('else reached')
            let secondsForRep = distanceToTime(toDelete.distance, toDelete.distanceUnit, ((teamPace * 60) / (toDelete.percent / 100)));
            let updatedDistance = this.state.totalDistance - getDistance2(toDelete.distance, toDelete.distanceUnit);
            let updatedTime = this.state.totalTime - secondsForRep
            this.setState({
                totalTime: updatedTime,
                totalDistance: updatedDistance
            })
        }
        console.log(this.state.totalTime, this.state.totalDistance)
    }



    handleEdit(rep, index){
        console.log(this.state)
        let toReturn = this.state.reps;
        toReturn[index] = rep;
        this.setState({
            reps: toReturn
        })
    }

    moveCard = (dragIndex, hoverIndex) => {
        console.log("Called");
        console.log(dragIndex);
        console.log(hoverIndex)
        const dragRep = this.state.reps[dragIndex];
        this.setState(
            update(this.state, {
                reps: {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragRep]
                    ]
                }
            })
        )
        
    }

    render() {
        if(!this.props.selectedTeam || !this.props.teams){
            return null;
        }
        if(this.state.toWorkoutHome){
            this.props.history.push('/workoutcreator')
            return <Redirect to='/workouts' />
          }
        return (
            <Row>
                <Col sm = {4}>
                    <Card className= "text-center">
                        <Card.Header>New Workout</Card.Header>
                        <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Workout Name</Form.Label>
                                <Form.Control onChange = {this.handleChange} name = "name" type = "text" placeholder = "Enter Workout Name"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Add Warmup</Form.Label>
                                </Form.Group>
                                <Row className = "justify-content-md-center">
                            <Col xs={5} md={4} className = "justify-content-md-center">
                                    <p></p>
                                    </Col>
                                    </Row>
                                <Row>
                                <Col/>
                            <Col>
                            <WarmupDistancePopover addArr = {this.handleCreate}/>
                            </Col>
                            <Col>
                            <WarmupDurationPopover addArr = {this.handleCreate}/>
                            </Col>
                            <Col/>
                            </Row>
                            <p/>
                            <Form.Group>
                                <Form.Label>Add Rep</Form.Label>
                            </Form.Group>
                            <Row className = "justify-content-md-center">
                            <Col xs={5} md={4} className = "justify-content-md-center">
                                    <p></p>
                                    </Col>
                                    </Row>
                            <Row>
                                <Col/>
                            <Col>
                            <RepDistancePopover addArr = {this.handleCreate}/>
                            </Col>
                            <Col>
                            <RepDurationPopover addArr = {this.handleCreate}/>
                            </Col>
                            <Col/>
                            </Row>
                            <p/>
                            <Form.Group>
                                <Form.Label>Add Cooldown</Form.Label>
                            </Form.Group>
                            <Row className = "justify-content-md-center">
                            <Col xs={5} md={4} className = "justify-content-md-center">
                                    <p></p>
                                    </Col>
                                    </Row>
                            <Row>
                                <Col/>
                            <Col>
                            <CooldownDistancePopover addArr = {this.handleCreate}/>
                            </Col>
                            <Col>
                            <CooldownDurationPopover addArr = {this.handleCreate}/>
                            </Col>
                            <Col/>
                            </Row>
                            <p/>
                            <Button variant = "primary" onClick = {this.handleCreateWorkout}>Create</Button>
                        </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm = {8}>
                <ExistingWorkoutGraph team = {this.props.teams[this.props.selectedTeam]} reps = {this.state.reps}></ExistingWorkoutGraph>
                <br />
                <Card className = 'text-center'>
        <Card.Header>
            <Row>
                <Col>
                Total Distance: {Math.round(this.state.totalDistance * 100) / 100} miles
                </Col>
                <Col>
                Total Time: {secondsToAnswer(this.state.totalTime)}
                </Col>
            </Row>
            </Card.Header>
                    {this.state.reps.map((rep, i) => (
                        <RepsCard 
                        rep = {rep}
                        index = {i}
                        moveCard = {this.moveCard}
                        onDelete = {this.handleDelete}
                        onEdit = {this.handleEdit}
                        setShow = {this.setShow}
                        show = {this.state.show}
                        />
                    ))}
                </Card>
                </Col>
                {/* <Col>
                    <Card>
                        <Card.Header>Total Information</Card.Header>
                    </Card>
                </Col> */}
            </Row>
        )
    }
}

WorkoutCreator.propTypes = {
    selectedTeam: PropTypes.string.isRequired,
    rehydrated: PropTypes.bool.isRequired,
    setBlueprint: PropTypes.func.isRequired,
    teams: PropTypes.object.isRequired
}

const mapStateToProps = function(state){
    return {
        blueprints: state.workouts.blueprints,
        selectedTeam: state.teams.selectedTeam,
        rehydrated: state._persist.rehydrated,
        selectedBlueprint: state.workouts.selectedBlueprint,
        teams: state.teams.teams
    }
}

export default connect(mapStateToProps, {  newWorkoutBlueprint, setBlueprint }) (WorkoutCreator);