import React, { Component } from 'react'
import { Row, Card, Col, Form, Button } from 'react-bootstrap'
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

export class WorkoutCreator extends Component {
    constructor(props){
        super(props);

        this.state = {
            name:'',
            reps:[],
            toWorkoutHome: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        console.log("changed");
        console.log(e.target.value);
        this.setState({ [e.target.name] : e.target.value});
    }

    handleCreateWorkout = () => {
        const workoutData = {
            name: this.state.name,
            reps: this.state.reps
        }
        this.props.newWorkoutBlueprint(workoutData, this.props.selectedTeam);
        this.setState({
            toWorkoutHome: true
          })
    }

    handleCreate = (repData) => {
        let arr = this.state.reps
        arr.push(repData)
        this.setState({reps:arr})
    }

    render() {
        if(!this.props.selectedTeam){
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
                            <Button variant = "primary" onClick = {this.handleCreateWorkout}>Create</Button>
                        </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm = {8}>
                <ExistingWorkoutGraph team = {this.props.teams[this.props.selectedTeam]} reps = {this.state.reps}></ExistingWorkoutGraph>
                <br />
                <Card className = 'text-center'>
                    {this.state.reps.map((rep) => (
                        <RepsCard 
                        rep = {rep}
                        />
                    ))}
                </Card>
                </Col>
                
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
