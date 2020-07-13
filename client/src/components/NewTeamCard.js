import React, { Component } from 'react';
import {Card, Button} from 'react-bootstrap';
import '../css/teamselect.css'


export class AddNewTeam extends Component {
    
    render() {
        return (
        <Card className = "teamselect-teamcard">
            <Card.Body>
            <Card.Title>New Team</Card.Title>
                <Button className = "teamselect-button" onClick= {() => this.props.onClick()}>+</Button>
            </Card.Body>
        </Card>
        )
    }
}

export default AddNewTeam
