import React, { Component } from 'react';
import {Card, Button} from 'react-bootstrap';


export class AddNewTeam extends Component {
    // eslint-disable-next-line
    constructor(props){
        super(props);
    }
    
    render() {
        return (
        <Card style = {{width: '18%', height: '18%'}} className = "text-center">
            <Card.Body>
            <Card.Title>New Team</Card.Title>
                <Button onClick= {() => this.props.onClick()}>+</Button>
                <br></br>
            </Card.Body>
        </Card>
        )
    }
}

export default AddNewTeam
