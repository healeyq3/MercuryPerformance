import React, { Component } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import cookie from 'react-cookies';

export class EventAddRunnersModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            runners: []
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }
    handleAddRunners = () => {
        const runnersData = {
            user: cookie.load('user'),
            runners: this.state.runners
        }
        this.props.addEventRunners(runnersData, this.props.teamUID);//need to pass in selectedTeamUID here
        this.props.setShow();
    }
    render() {
        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow}>
            <Modal.Dialog>
                <Modal.Header closeButton>Add Runners</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Runners</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "runner" type = "radio" autocomplete = "off"/>
                        </Form.Group>
                        <Button variant = "primary" onClick = {this.handleAddRunners}>Save</Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
            </Modal>
        )
    }
}

export default EventAddRunnersModal
