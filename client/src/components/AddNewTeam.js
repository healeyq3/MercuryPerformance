import React, { Component } from 'react';
import {Card} from 'react-bootstrap';

export class AddNewTeam extends Component {
    render() {
        return (
        <Card style = {{width: '18%', height: '18%'}}>
            <Card.Body>
                <Card.Link href = '#'>Add New Team</Card.Link>
            </Card.Body>
        </Card>
        )
    }
}

export default AddNewTeam
