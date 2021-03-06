import React, { Component } from 'react'
import { Modal, Form, Button } from '../../../node_modules/react-bootstrap';
import { connect } from '../../../node_modules/react-redux';
import { newWorkoutBlueprint } from '../../actions/workoutActions';
import cookie from '../../../node_modules/react-cookies';

export class AddWorkoutModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            type: ''
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
            type: this.state.type,
        }
        this.props.newWorkoutBlueprint(workoutData, this.props.teamUID);
        this.props.setShow();
        window.location.href='./workoutcreator'
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
                                <option>Tempo Run</option>
                                <option>Hill Repeats</option>
                                <option>Strides</option>
                                <option>Time Trial</option>
                                <option>Other</option>
                                </Form.Control>
                        </Form.Group>
                        <Button variant = "primary" onClick = {this.handleCreateWorkout}>Create Workout</Button>
                    </Form>
                </Modal.Body>
            {/* </Modal.Dialog> */}
            </Modal>
        )
    }
}

export default connect(null, { newWorkoutBlueprint }) (AddWorkoutModal);