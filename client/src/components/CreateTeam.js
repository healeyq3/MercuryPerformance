import React, { Component } from 'react'
import { Form, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {findDOMNode} from "react-dom";

export class CreateTeam extends React.Component {
    constructor(props){
        super(props);
        this.teamNameInput = React.createRef();
        this.teamYearInput = React.createRef();
        this.teamLevelSelection = React.createRef();
        this.teamWorkoutFormulaSelection = React.createRef();

        this.createTeam = this.createTeam.bind(this);
    }
    
    createTeam(){
        console.log("Creating team...");
        const teamName = this.teamNameInput.current.value;
        const teamYear = this.teamYearInput.current.value;
        const teamLevel = this.teamLevelSelection.current.value;
        const teamWorkoutFormula = this.teamWorkoutFormulaSelection.current.value;
        console.log(teamName);
        console.log(teamYear);
        console.log(teamLevel);
        console.log(teamWorkoutFormula);
    }

    render() {
        return (
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Label>Team Name:</Form.Label>
                        <Form.Control ref={this.teamNameInput} type = "text" placeholder = "Enter Team Name"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Year (optional):</Form.Label>
                        <Form.Control ref={this.teamYearInput} type = "text" placeholder = "ex: 2020" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>What Level is your team?</Form.Label>
                        <Form.Control ref={this.teamLevelSelection} as = "select">
                            <option>Middle School</option>
                            <option>High School</option>
                            <option>Club</option>
                            <option>College</option>
                            <option>Professional</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Preferred Workout Formula</Form.Label>
                        <Form.Control ref={this.teamWorkoutFormulaSelection} as = "select">
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

export default CreateTeam
