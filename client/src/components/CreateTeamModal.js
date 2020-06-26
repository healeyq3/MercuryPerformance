import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { newTeam } from '../actions/teamActions';
import cookie from 'react-cookies';

export class CreateTeamModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            teamName: '',
            teamYear: '',
            teamLevel: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }

    handleCreateTeam = () => {
        const teamData = {
            teamName: this.state.teamName,
            teamYear: this.state.teamYear,
            teamLevel: this.state.teamLevel,
        }
        this.props.newTeam(teamData);
        this.props.setShow();
    }
    
    render() {
        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow}>
           
                <Modal.Header closeButton>Create New Team</Modal.Header>
                <Modal.Body>
                    <Form className = "text-center">
                        <Form.Group>
                            <Form.Label>Team Name</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "teamName" type = "text" placeholder = "Enter Team Name"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Year</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "teamYear" type = "text" placeholder = "ex: 2020" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Team Level</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "teamLevel" as = "select">
                                <option hidden>Level</option>
                                <option>Middle School</option>
                                <option>High School</option>
                                <option>Club</option>
                                <option>College</option>
                                <option>Professional</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant = "primary" onClick = {this.handleCreateTeam}>Add Team</Button>
                    </Form>
                </Modal.Body>
           
            </Modal>
        )
    }
}

export default connect(null, { newTeam }) (CreateTeamModal);
