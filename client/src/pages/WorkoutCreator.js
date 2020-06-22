import React, { Component } from 'react'
import { Row, Card, Col, Form, Button } from 'react-bootstrap'
import WarmupDistancePopover from '../components/workout/WarmupDistancePopover'
import { CooldownDistancePopover } from '../components/workout/CooldownDistancePopover'
import RepDistancePopover from '../components/workout/RepDistancePopover'
import CooldownDurationPopover from '../components/workout/CooldownDurationPopover'
import WarmupDurationPopover from '../components/workout/WarmupDurationPopover'
import RepDurationPopover from '../components/workout/RepDurationPopover'
import cookie from 'react-cookies';
import { newWorkoutBlueprint, setBlueprint } from '../actions/workoutActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class WorkoutCreator extends Component {
    constructor(props){
        super(props);

        this.state = {
            name:'',
            reps:[]
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        console.log("changed");
        console.log(e.target.value);
        this.setState({ [e.target.name] : e.target.value});
    }
    handleCreateWorkout = () => {
        // eslint-disable-next-line 
        const workoutData = {
            user: cookie.load('user'),
            name: this.state.name,
        }
        this.props.newWorkoutBlueprint(workoutData, this.props.selectedTeam);
    }
    handleCreate = (repData) => {
        let arr = this.state.reps
        arr.push(repData)
        this.setState({reps:arr})
        console.log(this.state.reps)
        //this.props.newTeam(teamData);
    }
    render() {
        if(!this.props.selectedTeam){
            return null;
        }
        
        return (
            <Row>
                <Col>
                    <Card className= "text-center">
                        <Card.Header>New Workout</Card.Header>
                        <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Workout Name</Form.Label>
                                <Form.Control onChange = {this.handleChange} name = "name" type = "text" placeholder = "Enter Workout Name"/>
                            </Form.Group>
                                <Button variant = "primary" onClick = {this.handleCreateWorkout}>Save</Button>
                                <p></p>
                            <Form.Group>
                                <Form.Label>Add Warmup</Form.Label>
                                </Form.Group>
                                <Row>
                                <Col></Col>
                            <Col>
                            <WarmupDistancePopover addArr = {this.handleCreate}></WarmupDistancePopover>
                            </Col>
                            <Col>
                            <WarmupDurationPopover addArr = {this.handleCreate}></WarmupDurationPopover>
                            </Col>
                            <Col></Col>
                            </Row>
                            <p></p>
                            <Form.Group>
                                <Form.Label>Add Rep</Form.Label>
                            </Form.Group>
                            <Row>
                                <Col></Col>
                            <Col>
                            <RepDistancePopover addArr = {this.handleCreate}></RepDistancePopover>
                            </Col>
                            <Col>
                            <RepDurationPopover addArr = {this.handleCreate}></RepDurationPopover>
                            </Col>
                            <Col></Col>
                            </Row>
                            <p></p>
                            <Form.Group>
                                <Form.Label>Add Cooldown</Form.Label>
                            </Form.Group>
                            <Row>
                                <Col></Col>
                            <Col>
                            <CooldownDistancePopover addArr = {this.handleCreate}></CooldownDistancePopover>
                            </Col>
                            <Col>
                            <CooldownDurationPopover addArr = {this.handleCreate}></CooldownDurationPopover>
                            </Col>
                            <Col></Col>
                            </Row>
                        </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
                <Col></Col>
            </Row>
        )
    }
}

WorkoutCreator.propTypes = {
    selectedTeam: PropTypes.string.isRequired,
    rehydrated: PropTypes.bool.isRequired,
    setBlueprint: PropTypes.func.isRequired
}

const mapStateToProps = function(state){
    return {
        blueprints: state.workouts.blueprints,
        selectedTeam: state.teams.selectedTeam,
        rehydrated: state._persist.rehydrated,
        selectedBlueprint: state.workouts.selectedBlueprint
    }
}

export default connect(mapStateToProps, {  newWorkoutBlueprint, setBlueprint }) (WorkoutCreator);
