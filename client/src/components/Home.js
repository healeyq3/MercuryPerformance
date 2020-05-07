import React, { Component } from 'react'
import {withRouter} from 'react-router';
import  { Container, Button } from 'react-bootstrap'
import { Runners } from './Runners';
import {AddRunner} from './AddRunner';
import uuid from 'react-uuid';

export class Home extends Component {
    state = {
        runners : [
            {title : "Runner Name",
            id: uuid()
        }
        ]
    }

    delRunner = (id) => {
        this.setState({runners : [...this.state.runners.filter(runner => runner.id !==id)]});
    }
    addRunner = (title) => {
        const newRunner = {
            id :uuid(),
            title
        }
        this.setState({todos: [...this.state.runners, newRunner]});
    }

    
    render(){
        return(
            <Container fluid>
                <h1 className = "MercuryLogin">Mercury</h1>
                <h2 id = "teamNameHome">Team Name</h2>
                <AddRunner addRunner = {this.addRunner}></AddRunner>
                <Runners runners = {this.state.runners} delRunner = {this.delRunner}></Runners>

                
            </Container>
        )
    }
    
}
export default withRouter(Home);
