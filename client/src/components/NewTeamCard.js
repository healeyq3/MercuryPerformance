import React, { Component } from 'react';
import {Card, Button} from 'react-bootstrap';


export class AddNewTeam extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
        <Card style = {{width: '18%', height: '18%'}}>
            <Card.Body>
                <Button onClick= {() => this.props.onClick()}>New Team</Button>
            </Card.Body>
        </Card>
        )
    }
}

export default AddNewTeam
