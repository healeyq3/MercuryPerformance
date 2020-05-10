import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import {Form} from "react-bootstrap"
import {useState} from 'react'
export class AddRunnerModal extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <Modal.Dialog hidden = {this.props.setShow} scrollable = {true} >
                <Modal.Header>Add Runner</Modal.Header>
                <Modal.Body>
                <Form>
                     <Form.Group controlId = "controlInput2" onSubmit = {this.onSubmit}>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type = "text"
                            name = "title"
                            placeholder = "John O'Brien"
                            
                            onChange = {this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId = "controlInput1">
                        <Form.Label>Class</Form.Label>
                        <Form.Control 
                            type = "text"
                            placeholder = "Freshman"
                        />
                    </Form.Group>
                    <Form.Group controlId = "controlInput3">
                        <Form.Label>Workout Pace</Form.Label>
                        <Form.Control
                            type = "text"
                            placeholder = "00:00"
                        />
                    </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
        )
    }
}

export default AddRunnerModal
