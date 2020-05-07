import React, { Component } from 'react'
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class TeamSelectCard extends Component {
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
