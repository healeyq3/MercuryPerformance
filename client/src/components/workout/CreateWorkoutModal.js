import React, { Component } from 'react'
import { Modal, Form, Button } from '../../../node_modules/react-bootstrap';
import { connect } from '../../../node_modules/react-redux';
import cookie from '../../../node_modules/react-cookies';

export class AddWorkoutModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            date: '',
            location: '',
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
            date: this.state.date,
            location: this.state.location,
        }
        this.props.setShow();
    }
    render() {
        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow}>
            {/* <Modal.Dialog> */}
                <Modal.Header closeButton >Create New Workout</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Workout Name</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "name" type = "text" placeholder = "Enter Workout Name"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "date" type = "date"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "location" type = "text" placeholder = "Enter Event Location"/>
                        </Form.Group>
                        <Button variant = "primary" onClick = {this.handleCreateEvent}>Create Workout</Button>
                    </Form>
                </Modal.Body>
            {/* </Modal.Dialog> */}
            </Modal>
        )
    }
}

export default connect(null, {  }) (AddWorkoutModal);