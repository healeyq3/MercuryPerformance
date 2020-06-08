import React, { Component } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import cookie from 'react-cookies';

export class AddResultsModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            finalTime: '',
            oneMileSplit: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }
    handleAddResults = () => {
        const runnerData = {
            user: cookie.load('user'),
        }
        console.log(runnerData.user.uid);
        this.props.addResults(runnerData);
        this.props.setShow();
    }
    render() {
        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow}>
            <Modal.Dialog>
                <Modal.Header closeButton>Runner Name</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Final Time</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "teamName" type = "time" placeholder = "00:00:00"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Splits (optional)</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "teamYear" type = "text" placeholder = "ex: 2020" />
                            <Form.Control onChange = {this.handleChange} name = "teamLevel" as = "select">
                                <option hidden>Units</option>
                                <option>Miles</option>
                                <option>Kilometers</option>
                                <option>Meters</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant = "primary" onClick = {this.handleCreateTeam}>Add Team</Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
            </Modal>
        )
    }
}

export default AddResultsModal
