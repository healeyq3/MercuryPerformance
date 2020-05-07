import React, { Component } from 'react'
// eslint-disable-next-line
import { Card, Badge, Button } from 'react-bootstrap';
// eslint-disable-next-line
import { Link } from 'react-router-dom';

export class TeamSelectCard extends Component {
    // eslint-disable-next-line
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <Card style = {{width: '18%', height: '18%'}}>
            <Card.Body>
                <Card.Link href = './Home'>Boys XC</Card.Link>
                <Card.Subtitle>Fall 2020</Card.Subtitle>
                
                <Card.Link href = "#">Edit</Card.Link>
            </Card.Body>
        </Card>
        )
    }
}

export default TeamSelectCard
