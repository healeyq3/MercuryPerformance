import React, { Component } from 'react'
import  { Container, Button } from 'react-bootstrap'
// import { Runners } from './Runners';
// import {AddRunner} from './AddRunner';
import uuid from 'react-uuid';
import NavigationBar from '../components/NavigationBar';

class Home extends Component {
    state = {
        runners : [
            {title : "Runner Name",
            id: uuid()
        }
        ]
    }
    render() {
        return (
            <Container fluid>
                <NavigationBar></NavigationBar>
                <h2 id = "teamNameHome">Team Name</h2>
                {/*<AddRunner addRunner = {this.addRunner}></AddRunner>*/}
                {/*<Runners runners = {this.state.runners} ></Runners>*/}
            </Container>
        )
    }
}

export default Home
