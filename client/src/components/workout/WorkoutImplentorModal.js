import React, { Component } from 'react'
import { Modal, Form, Button, FormControl } from '../../../node_modules/react-bootstrap';
import { newActualWorkout } from '../../actions/workoutActions';
import { connect } from '../../../node_modules/react-redux';
import cookie from 'react-cookies';

export class WorkoutImplentorModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            date: ''
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
            user: cookie.load('user'),
            date: this.state.date,
            reps: this.props.reps
        }
        this.props.newActualWorkout(workoutData, this.props.teamUID);
        this.props.setShow();
    }
    
    render() {
        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow}>
            {/* <Modal.Dialog> */}
                <Modal.Header closeButton>Implement New Workout</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "date" type = "date"/>
                        </Form.Group>
                        <Button variant = "primary" onClick = {this.handleCreateWorkout}>Add Event</Button>
                    </Form>
                </Modal.Body>
            {/* </Modal.Dialog> */}
            </Modal>
        )
    }
}

export default connect(null, { newActualWorkout }) (WorkoutImplentorModal)
