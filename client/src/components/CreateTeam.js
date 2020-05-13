import React, { Component } from 'react'
import { Form, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {findDOMNode} from "react-dom";
import fire from '../Fire';

export class CreateTeam extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            teamName: '',
            teamYear: '',
            teamLevel: '',
            teamWorkoutFormula: ''
        }

        this.createTeam = this.createTeam.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    createTeam(){
        const teamName = this.state.teamName;
        const teamYear = this.state.teamYear;
        const teamLevel = this.state.teamLevel;
        const teamWorkoutFormula = this.state.teamWorkoutFormula;

        fetch('/createTeam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: fire.auth().currentUser,
                teamName: teamName,
                teamYear: teamYear,
                teamLevel: teamLevel,
                teamWorkoutFormula: teamWorkoutFormula
            })
        })
    }

    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }

    render() {
        return (
            <Container>
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
                    <Button variant = "primary" onClick = {this.createTeam} >Add Team</Button>
                </Form>
            </Container>
        )
    }
}

export default CreateTeam;
