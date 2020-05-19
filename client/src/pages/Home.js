import React, { Component } from 'react'
//import {withRouter} from 'react-router';
// eslint-disable-next-line
import  { Container, Button } from 'react-bootstrap'
// import { Runners } from './Runners';
 import {AddRunner} from '../components/AddRunner';
//import uuid from 'react-uuid';

class Home extends Component {
    
    render() {
        return (
            <Container fluid>
                <h2 id = "teamNameHome">Team Name</h2>
                <AddRunner addRunner = {this.addRunner}></AddRunner>
            </Container>
        )
    }
}

export default Home
