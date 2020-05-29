import React from 'react'
import { connect } from 'react-redux';
import  { Container, Button, Form, Modal } from 'react-bootstrap'
import { newRunner } from '../actions/runnerActions';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';

export class AddRunner extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            show: false,
            name: '',
            email: '',
            experience: '',
            gradYear: '',
            workoutPace: ''
        }
        this.handleChange = this.handleChange.bind(this);
        // this.handleAddRunner = this.handleAddRunner.bind(this);
    }
    
    showModal = e => {
        this.setState({
          show: !this.state.show
        });
      };

    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }

    handleAddRunner = () => {
        const runnerData = {
            user: cookie.load('user'),
            runnerName: this.state.name,
            runnerEmail: this.state.email,
            runnerExperience: this.state.runnerExperience,
            runnerGradYear: this.state.runnerGradYear,
            runnerWorkoutPace: this.state.workoutPace
        }
        console.log(this.props.teamUID);
        this.props.newRunner(runnerData, this.props.teamUID);
        this.state.showModal();
    }

    render(){
    return (
        <Container fluid>
            <Form>
                <Form.Group controlId = "enter">
                    <Button onClick={e => {this.showModal();}}>Add Runner</Button>
                </Form.Group>
            </Form>
            <Modal show = {this.state.show} onHide = {this.showModal}>
            <Modal.Dialog  >
                <Modal.Header closeButton>Add Runner</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type = "text"
                                name = "title"
                                placeholder = "John O'Brien"
                                onChange = {this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type = "text"
                                name = "title"
                                placeholder = "john@gmail.com"
                                onChange = {this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Runner Experience</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "runnerExperience" as = "select">
                                <option hidden>Level</option>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                                <option>Professional</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Runner Year</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "Runner Year" as = "select">
                                <option hidden>Class</option>
                                <option>Freshmen</option>
                                <option>Sophomore</option>
                                <option>Junior</option>
                                <option>Senior</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Workout Pace</Form.Label>
                            <Form.Control
                                type = "text"
                                placeholder = "00:00"
                            />
                        </Form.Group>
                        <Button variant = "primary" onClick = {this.handleAddRunner}>Add Runner</Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
            </Modal>
        </Container>
    )
    }
    
}

AddRunner.propTypes = {
    newRunner: PropTypes.func.isRequired
}


export default connect(null, { newRunner }) (AddRunner);
