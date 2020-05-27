import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
//import { Link } from 'react-router-dom';

export class ExistingTeamCard extends Component {
    // eslint-disable-next-line
    constructor(props){
        super(props);
    }
    
    render() {
        return (
        <Card style = {{width: '18%', height: '18%'}}>
            <Card.Body>
                <Card.Title>{this.props.team.teamName}</Card.Title>
                <Card.Subtitle>{this.props.team.year}</Card.Subtitle>
                <Card.Link href = './'>Select Team</Card.Link>
            </Card.Body>
        </Card>
        )
    }
}

export default ExistingTeamCard
