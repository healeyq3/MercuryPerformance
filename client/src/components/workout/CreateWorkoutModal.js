import React, { Component } from 'react'
import { Modal, Form, Button } from '../../../node_modules/react-bootstrap';
import { connect } from '../../../node_modules/react-redux';
import cookie from '../../../node_modules/react-cookies';

export class AddWorkoutModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            type: '',
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
            type: this.state.type,
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
                            <Form.Label>Type of Run</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "type" as = "select">
                                <option hidden>Type</option>
                                <option>Long Run</option>
                                <option>Recovery Run</option>
                                <option>Brick Run</option>
                                <option>Interval Run</option>
                                <option>Temp Run</option>
                                <option>Hill Repeats</option>
                                <option>Strides</option>
                                <option>Time Trial</option>
                                <option>Other</option>
                                </Form.Control>
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