import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap';

export class CreateTeamModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            teamName: '',
            teamYear: '',
            teamLevel: '',
            teamWorkoutFormula: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }
    
    render() {
        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow}>
            <Modal.Dialog>
                <Modal.Header closeButton>Create New Team</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Team Name</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "teamName" type = "text" placeholder = "Enter Team Name"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Year (optional)</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "teamYear" type = "text" placeholder = "ex: 2020" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Team level</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "teamLevel" as = "select">
                                <option hidden>Level</option>
                                <option>Middle School</option>
                                <option>High School</option>
                                <option>Club</option>
                                <option>College</option>
                                <option>Professional</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Preferred Workout Formula</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "teamWorkoutFormula" as = "select">
                                <option hidden>Formula</option>
                                <option>Benson</option>
                                <option>Tinman</option>
                                <option>Jack Daniel</option>
                            </Form.Control>
                            <Form.Text>Other:</Form.Text>
                            <Form.Control type = "text" />
                        </Form.Group>
                        <Button variant = "primary" onClick = {this.createTeam && this.props.setShow}>Add Team</Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
            </Modal>
        )
    }
}

export default CreateTeamModal
