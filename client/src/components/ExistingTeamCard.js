import React, { Component } from 'react'
import { Card } from 'react-bootstrap';

export class ExistingTeamCard extends Component {
    render() {
        return (
        <Card style = {{width: '18%', height: '18%'}}>
            <Card.Body>
                <Card.Title>{this.props.team.teamName}</Card.Title>
                <Card.Subtitle>{this.props.team.year}</Card.Subtitle>
                <Card.Link href = './Home' onClick={() => this.props.onSelect(this.props.team)}>Select Team</Card.Link>
            </Card.Body>
        </Card>
        )
    }
}

export default ExistingTeamCard;
