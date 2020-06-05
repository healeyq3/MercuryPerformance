import React, { Component } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { newEvent } from '../actions/eventActions';
import cookie from 'react-cookies';

export class CreateEventModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            //need to pass in selectedTeamUID
            date: '',
            location: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }
    handleCreateEvent = () => {
        const eventData = {
            user: cookie.load('user'),
            name: this.state.name,
            date: this.state.date,
            locationl: this.state.location,
        }
        console.log(eventData.user.uid);
        this.props.newTeam(eventData);
        this.props.setShow();
    }
    render() {
        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow}>
            <Modal.Dialog>
                <Modal.Header closeButton>Create New Event</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Event Name</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "name" type = "text" placeholder = "Enter Event Name"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "date" type = "date"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "location" type = "text" placeholder = "Enter Event Location"/>
                        </Form.Group>
                        <Button variant = "primary" onClick = {this.handleCreateEvent}>Add Event</Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
            </Modal>
        )
    }
}

export default connect(null, { newEvent }) (CreateEventModal);
