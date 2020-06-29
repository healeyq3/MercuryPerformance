import React, { Component } from 'react'
import { Container, Nav, Row, Col, Card, Button, Form } from 'react-bootstrap'
import WorkoutBlueprintDayCard from '../components/workout/WorkoutBlueprintDayCard'
import WorkoutDetailsCard from '../components/workout/WorkoutDetailsCard'
import ExistingWorkoutGraph from '../components/workout/ExistingWorkoutGraph'
import { connect } from 'react-redux';
import WorkoutImplementor from '../components/workout/WorkoutImplementor';
import { getActualWorkouts, setWorkout, getWorkoutBlueprints } from '../actions/workoutActions'
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";
import WarmupDistancePopover from '../components/workout/WarmupDistancePopover';
import CooldownDistancePopover  from '../components/workout/CooldownDistancePopover';
import RepDistancePopover from '../components/workout/RepDistancePopover';
import CooldownDurationPopover from '../components/workout/CooldownDurationPopover'
import WarmupDurationPopover from '../components/workout/WarmupDurationPopover'
import RepDurationPopover from '../components/workout/RepDurationPopover'
import { updateBlueprint, setBlueprint } from '../actions/workoutActions'
import RepsCard from '../components/workout/RepsCard';
import update from 'immutability-helper'

export class WorkoutDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            toWorkoutDate: false,
            toEditor: false,
            name: '',
            reps: [],
            show2: false
        }
        // this.goToEditor = this.goToEditor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
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

    setShow2 = e => {
        this.setState({
            show2: !this.state.show
        })
    }

    handleChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    handleUpdateWorkout = () => {
        const blueprintData = {
            name: this.state.name,
            reps: this.state.reps,
            blueprintuid: this.props.selectedBlueprint
        }
        this.props.updateBlueprint(blueprintData, this.props.selectedTeam);
        this.setState({
            toEditor: false
        })
    }

    handleCreate = (repData) => {
        let arr = this.state.reps;
        arr.push(repData)
        this.setState({reps: arr})
    }

    handleDelete(index){
        let toReturn = this.state.reps;
        toReturn.splice(index, 1);
        this.setState({
            reps: toReturn
        })
    }

    handleEdit(rep, index){ //issue with the state, might be looking for it in reps card?
        let toReturn = this.state.reps;
        toReturn[index] = rep;
        this.setState({
            rep: toReturn
        })
    }

    moveCard = (dragIndex, hoverIndex) => {
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

    reset = () => {
         console.log(this.props.blueprints[this.props.selectedBlueprint]);
        if(this.props.blueprints[this.props.selectedBlueprint].hasOwnProperty('name')){
            this.setState({
                name: this.props.blueprints[this.props.selectedBlueprint].name
            })
        }
        if(this.props.blueprints[this.props.selectedBlueprint].hasOwnProperty('reps')){
            this.setState({
                reps: this.props.blueprints[this.props.selectedBlueprint].reps
            })
        }
    }

    componentDidUpdate(prevProps, prevState, ss){
        if(prevProps.rehydrated === false){
            this.props.getActualWorkouts(this.props.selectedTeam, this.props.selectedBlueprint);
            this.props.getWorkoutBlueprints(this.props.selectedTeam);
            this.reset()
        }
        
        // if(this.props.blueprints[this.selectedBlueprint].name !== undefined){
        //     this.setState({
        //         name: this.props.blueprints[this.selectedBlueprint].name
        //     })
        // }
        // if(this.props.blueprints[this.selectedBlueprint].name !== undefined){
        //     this.setState({
        //         reps: this.props.blueprints[this.selectedBlueprint].reps
        //     })
        // }
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
        //  if(this.props.blueprints[this.selectedBlueprint].name !== undefined){
        //     this.setState({
        //         name: this.props.blueprints[this.selectedBlueprint].name
        //     })
        // }
        // if(this.props.blueprints[this.selectedBlueprint].name !== undefined){
        //     this.setState({
        //         reps: this.props.blueprints[this.selectedBlueprint].reps
        //     })
        // }
        return (
            // <Container>
             
                <React.Fragment>
                <Row>
                    <Container fluid>
                    <Nav fill variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link onClick = {() => this.setState(state => ({toEditor: !state.toEditor}))}>Workout Name</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick = {() => this.setState(state => ({toEditor: !state.toEditor}))}>Edit Blueprint</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href = "./workouts">Delete</Nav.Link>
                    </Nav.Item>
                    </Nav>
                    </Container>
                </Row>
                {this.state.toEditor  === false? <Row>
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
                    <Row>
                        <WorkoutDetailsCard/>
                    </Row>
                    </Col>
                    </Row>
                    :
                    <Row>
                    <Col sm = {4}>
                        <Card className= "text-center">
                            <Card.Header>New Workout</Card.Header>
                            <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Workout Name</Form.Label>
                                    <Form.Control onChange = {this.handleChange} name = "name" type = "text" value = {this.state.name}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Add Warmup</Form.Label>
                                    </Form.Group>
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
                                <Button variant = "primary" onClick = {this.handleUpdateWorkout}>Update</Button>
                            </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm = {8}>
                    <ExistingWorkoutGraph team = {this.props.teams[this.props.selectedTeam]} reps = {this.state.reps}></ExistingWorkoutGraph>
                    <br />
                    <Card className = 'text-center'>
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
                </Row>}
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
    setWorkout: PropTypes.func.isRequired,
    updateBlueprint: PropTypes.func.isRequired
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

export default connect(mapStateToProps, { getWorkoutBlueprints, getActualWorkouts, setWorkout, updateBlueprint, setBlueprint }) (WorkoutDetails)
