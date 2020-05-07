import React, { Component } from 'react'

export class CreateTeam extends Component {
    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Team Name:</Form.Label>
                    <Form.Control type = "text" placeholder = "Enter Team Name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Year (optional):</Form.Label>
                    <Form.Control type = "text" placeholder = "ex: 2020" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>What Level is your team?</Form.Label>
                    <Form.Control as = "select">
                        <option>Middle School</option>
                        <option>High School</option>
                        <option>Club</option>
                        <option>College</option>
                        <option>Professional</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Preferred Workout Formula</Form.Label>
                    <Form.Control as = "select">
                        <option>Benson</option>
                        <option>Tinman</option>
                        <option>Jack Daniel</option>
                    </Form.Control>
                    <Form.Text>Other:</Form.Text>
                    <Form.Control type = "text" />
                </Form.Group>
            </Form>
        )
    }
}

export default CreateTeam
